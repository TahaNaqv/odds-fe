
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IRaffleCore.sol";
import "./interfaces/ITicketManager.sol";
import "./interfaces/IRandomnessProvider.sol";
import "./interfaces/IAutoEnrollment.sol";
import "./interfaces/IERC20.sol";

/**
 * @title RaffleCore
 * @dev Main contract for the raffle system
 */
contract RaffleCore is IRaffleCore {
    // State variables
    uint256 private currentRaffleId;
    mapping(uint256 => RaffleInfo) private raffles;
    mapping(uint256 => bytes32) private raffleRandomnessRequests;
    
    // Contract references
    ITicketManager public ticketManager;
    IRandomnessProvider public randomnessProvider;
    IAutoEnrollment public autoEnrollment;
    
    // Constants
    uint256 public constant RAFFLE_DURATION = 1 days;
    uint256 public constant TICKET_PRICE = 1e6; // $1 in USDC/USDT (6 decimals)
    
    // Prize distribution percentages (basis points: 1/100 of a percent)
    uint256 public constant WINNERS_SHARE = 9500; // 95%
    uint256 public constant BUYBACK_SHARE = 300;  // 3%
    uint256 public constant OPERATIONS_SHARE = 100; // 1%
    uint256 public constant CREATOR_SHARE = 100;   // 1%
    
    // Total basis points (100%)
    uint256 private constant TOTAL_BASIS_POINTS = 10000;
    
    // Allowed payment tokens
    mapping(address => bool) public allowedTokens;
    
    // Treasury addresses
    address public buybackAddress;
    address public operationsAddress;
    address public creatorAddress;
    
    // Owner of the contract
    address private owner;
    
    // Events
    event PrizeDistributed(
        uint256 indexed raffleId, 
        address winner, 
        uint256 winnerAmount,
        address buybackAddress,
        uint256 buybackAmount,
        address operationsAddress,
        uint256 operationsAmount,
        address creatorAddress,
        uint256 creatorAmount
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "RaffleCore: caller is not the owner");
        _;
    }
    
    constructor(
        address _randomnessProvider,
        address[] memory _allowedTokens,
        address _buybackAddress,
        address _operationsAddress,
        address _creatorAddress
    ) {
        owner = msg.sender;
        
        // Create the TicketManager contract
        ticketManager = new TicketManager();
        
        // Set the randomness provider
        randomnessProvider = IRandomnessProvider(_randomnessProvider);
        
        // Set treasury addresses
        buybackAddress = _buybackAddress;
        operationsAddress = _operationsAddress;
        creatorAddress = _creatorAddress;
        
        // Set allowed tokens
        for (uint256 i = 0; i < _allowedTokens.length; i++) {
            allowedTokens[_allowedTokens[i]] = true;
        }
        
        // Start the first raffle
        startNewRaffle();
        
        // Create the AutoEnrollment contract (after starting the first raffle)
        autoEnrollment = new AutoEnrollment(address(this), _allowedTokens);
    }
    
    /**
     * @dev Creates a new raffle round
     */
    function startNewRaffle() public override {
        // Ensure previous raffle is completed if it exists
        if (currentRaffleId > 0) {
            require(
                raffles[currentRaffleId].state == RaffleState.COMPLETED,
                "RaffleCore: current raffle not yet completed"
            );
        }
        
        // Increment raffle ID
        currentRaffleId++;
        
        // Set up new raffle
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + RAFFLE_DURATION;
        
        raffles[currentRaffleId] = RaffleInfo({
            id: currentRaffleId,
            startTime: startTime,
            endTime: endTime,
            ticketsSold: 0,
            prizePool: 0,
            winner: address(0),
            winningTicketId: 0,
            winnerGroup: WinnerGroup.NONE,
            state: RaffleState.OPEN
        });
        
        emit RaffleStarted(currentRaffleId, startTime, endTime);
        
        // Process auto-enrollments for the new raffle
        if (address(autoEnrollment) != address(0)) {
            autoEnrollment.processAutoEnrollments(currentRaffleId);
        }
    }
    
    /**
     * @dev Purchases tickets for the current raffle
     * @param count Number of tickets to purchase
     * @param token The token used for payment (USDC or USDT)
     */
    function purchaseTickets(uint256 count, address token) external override {
        require(count > 0, "RaffleCore: count must be greater than zero");
        require(allowedTokens[token], "RaffleCore: token not allowed");
        
        RaffleInfo storage raffle = raffles[currentRaffleId];
        
        require(raffle.state == RaffleState.OPEN, "RaffleCore: raffle not open");
        require(block.timestamp < raffle.endTime, "RaffleCore: raffle ended");
        
        // Calculate total cost
        uint256 totalCost = count * TICKET_PRICE;
        
        // Transfer tokens from buyer to this contract
        IERC20 tokenContract = IERC20(token);
        require(
            tokenContract.transferFrom(msg.sender, address(this), totalCost),
            "RaffleCore: token transfer failed"
        );
        
        // Issue tickets
        (uint256 startId, uint256 endId) = ticketManager.issueTickets(currentRaffleId, msg.sender, count);
        
        // Update raffle info
        raffle.ticketsSold += count;
        raffle.prizePool += totalCost;
        
        emit TicketsPurchased(msg.sender, currentRaffleId, count, startId, endId);
        
        // Check if raffle should end
        if (block.timestamp >= raffle.endTime) {
            drawRaffle();
        }
    }
    
    /**
     * @dev Triggers the drawing process for the current raffle
     */
    function drawRaffle() public override {
        RaffleInfo storage raffle = raffles[currentRaffleId];
        
        require(raffle.state == RaffleState.OPEN, "RaffleCore: raffle not in open state");
        require(
            block.timestamp >= raffle.endTime || msg.sender == owner,
            "RaffleCore: raffle not yet ended"
        );
        
        // Change state to drawing
        raffle.state = RaffleState.DRAWING;
        
        // Request randomness
        bytes32 requestId = randomnessProvider.requestRandomness();
        raffleRandomnessRequests[currentRaffleId] = requestId;
        
        // In a real implementation, we would wait for the randomness to be fulfilled
        // For this example, we'll check if it's immediately available
        if (randomnessProvider.isRandomnessAvailable(requestId)) {
            finalizeRaffle(currentRaffleId);
        }
    }
    
    /**
     * @dev Finalizes a raffle after randomness is available
     * @param raffleId The ID of the raffle to finalize
     */
    function finalizeRaffle(uint256 raffleId) public {
        RaffleInfo storage raffle = raffles[raffleId];
        
        require(raffle.state == RaffleState.DRAWING, "RaffleCore: raffle not in drawing state");
        
        bytes32 requestId = raffleRandomnessRequests[raffleId];
        require(
            randomnessProvider.isRandomnessAvailable(requestId),
            "RaffleCore: randomness not yet available"
        );
        
        // Get total tickets sold
        uint256 totalTickets = ticketManager.getTotalTickets(raffleId);
        
        if (totalTickets == 0) {
            // No tickets sold, just complete the raffle
            raffle.state = RaffleState.COMPLETED;
            startNewRaffle();
            return;
        }
        
        // Get randomness
        uint256 randomValue = randomnessProvider.getRandomness(requestId);
        
        // Select winning ticket
        uint256 winningTicketIndex = randomValue % totalTickets;
        uint256 winningTicketId = winningTicketIndex + 1; // Ticket IDs start at 1
        
        // Get winner address
        address winner = ticketManager.getTicketOwner(winningTicketId);
        
        // Determine winner group based on another part of the randomness
        uint256 groupRandomness = uint256(keccak256(abi.encode(randomValue, "group")));
        WinnerGroup winnerGroup;
        
        if (groupRandomness % 100 < 10) {
            // 10% chance for double prize
            winnerGroup = WinnerGroup.DOUBLE;
        } else if (groupRandomness % 100 < 30) {
            // 20% chance for equal prize
            winnerGroup = WinnerGroup.EQUAL;
        } else {
            // 70% chance for no prize
            winnerGroup = WinnerGroup.NONE;
        }
        
        // Update raffle info
        raffle.winner = winner;
        raffle.winningTicketId = winningTicketId;
        raffle.winnerGroup = winnerGroup;
        raffle.state = RaffleState.COMPLETED;
        
        // Distribute prize
        distributePrize(raffleId, winner, winnerGroup);
        
        emit RaffleCompleted(
            raffleId,
            winner,
            winningTicketId,
            winnerGroup,
            raffle.prizePool
        );
        
        // Start new raffle
        startNewRaffle();
    }
    
    /**
     * @dev Distributes the prize for a completed raffle
     * @param raffleId The ID of the completed raffle
     * @param winner The address of the winner
     * @param winnerGroup The winner group determining the prize amount
     */
    function distributePrize(
        uint256 raffleId,
        address winner,
        WinnerGroup winnerGroup
    ) 
        private 
    {
        RaffleInfo storage raffle = raffles[raffleId];
        uint256 prizePool = raffle.prizePool;
        
        // Calculate shares
        uint256 winnersShare = (prizePool * WINNERS_SHARE) / TOTAL_BASIS_POINTS;
        uint256 buybackShare = (prizePool * BUYBACK_SHARE) / TOTAL_BASIS_POINTS;
        uint256 operationsShare = (prizePool * OPERATIONS_SHARE) / TOTAL_BASIS_POINTS;
        uint256 creatorShare = (prizePool * CREATOR_SHARE) / TOTAL_BASIS_POINTS;
        
        // Calculate winner's prize based on group
        uint256 winnerPrize;
        if (winnerGroup == WinnerGroup.DOUBLE) {
            winnerPrize = winnersShare * 2;
            // In a real implementation, we'd need a mechanism to handle cases
            // where the doubled prize exceeds the prize pool
        } else if (winnerGroup == WinnerGroup.EQUAL) {
            winnerPrize = winnersShare;
        } else {
            winnerPrize = 0;
        }
        
        // Get token used in the raffle (for simplicity, let's use the first allowed token)
        address token;
        for (uint i = 0; i < 2; i++) {
            if (allowedTokens[address(bytes20(bytes32(uint256(uint160(address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE))) + i))]) {
                token = address(bytes20(bytes32(uint256(uint160(address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE))) + i)));
                break;
            }
        }
        
        IERC20 tokenContract = IERC20(token);
        
        // Transfer tokens to winners and treasury addresses
        if (winnerPrize > 0) {
            tokenContract.transfer(winner, winnerPrize);
        }
        
        tokenContract.transfer(buybackAddress, buybackShare);
        tokenContract.transfer(operationsAddress, operationsShare);
        tokenContract.transfer(creatorAddress, creatorShare);
        
        emit PrizeDistributed(
            raffleId,
            winner,
            winnerPrize,
            buybackAddress,
            buybackShare,
            operationsAddress,
            operationsShare,
            creatorAddress,
            creatorShare
        );
    }
    
    /**
     * @dev Returns information about a specific raffle
     * @param raffleId The ID of the raffle
     */
    function getRaffleInfo(uint256 raffleId) 
        external 
        view 
        override 
        returns (RaffleInfo memory) 
    {
        require(raffleId > 0 && raffleId <= currentRaffleId, "RaffleCore: invalid raffle ID");
        return raffles[raffleId];
    }
    
    /**
     * @dev Returns the current raffle ID
     */
    function getCurrentRaffleId() external view override returns (uint256) {
        return currentRaffleId;
    }
    
    /**
     * @dev Updates the treasury addresses
     * @param _buybackAddress New buyback address
     * @param _operationsAddress New operations address
     * @param _creatorAddress New creator address
     */
    function updateTreasuryAddresses(
        address _buybackAddress,
        address _operationsAddress,
        address _creatorAddress
    ) 
        external 
        onlyOwner 
    {
        buybackAddress = _buybackAddress;
        operationsAddress = _operationsAddress;
        creatorAddress = _creatorAddress;
    }
    
    /**
     * @dev Updates the allowed tokens
     * @param token Token address
     * @param allowed Whether the token is allowed
     */
    function updateAllowedToken(address token, bool allowed) 
        external 
        onlyOwner 
    {
        allowedTokens[token] = allowed;
    }
    
    /**
     * @dev Transfers contract ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) 
        external 
        onlyOwner 
    {
        require(newOwner != address(0), "RaffleCore: new owner is the zero address");
        owner = newOwner;
    }
}
