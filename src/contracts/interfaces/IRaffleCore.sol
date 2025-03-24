
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IRaffleCore
 * @dev Interface for the main raffle contract
 */
interface IRaffleCore {
    enum RaffleState { OPEN, DRAWING, COMPLETED }
    enum WinnerGroup { DOUBLE, EQUAL, NONE }
    
    struct RaffleInfo {
        uint256 id;
        uint256 startTime;
        uint256 endTime;
        uint256 ticketsSold;
        uint256 prizePool;
        address winner;
        uint256 winningTicketId;
        WinnerGroup winnerGroup;
        RaffleState state;
    }
    
    event RaffleStarted(uint256 indexed raffleId, uint256 startTime, uint256 endTime);
    event RaffleCompleted(uint256 indexed raffleId, address winner, uint256 ticketId, WinnerGroup group, uint256 prize);
    event TicketsPurchased(address indexed buyer, uint256 indexed raffleId, uint256 count, uint256 startId, uint256 endId);
    
    /**
     * @dev Creates a new raffle round
     */
    function startNewRaffle() external;
    
    /**
     * @dev Purchases tickets for the current raffle
     * @param count Number of tickets to purchase
     * @param token The token used for payment (USDC or USDT)
     */
    function purchaseTickets(uint256 count, address token) external;
    
    /**
     * @dev Triggers the drawing process for the current raffle
     */
    function drawRaffle() external;
    
    /**
     * @dev Returns information about a specific raffle
     * @param raffleId The ID of the raffle
     */
    function getRaffleInfo(uint256 raffleId) external view returns (RaffleInfo memory);
    
    /**
     * @dev Returns the current raffle ID
     */
    function getCurrentRaffleId() external view returns (uint256);
}
