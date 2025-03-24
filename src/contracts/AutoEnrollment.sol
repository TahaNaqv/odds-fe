// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IAutoEnrollment.sol";
import "./interfaces/IRaffleCore.sol";
import "./interfaces/IERC20.sol";

/**
 * @title AutoEnrollment
 * @dev Manages auto-enrollment for raffle tickets
 */
contract AutoEnrollment is IAutoEnrollment {
    IRaffleCore public raffleCore;
    
    // User auto-enrollment settings
    mapping(address => AutoEnrollInfo) private autoEnrollments;
    
    // Address of the RaffleCore contract
    address private raffleCoreAddress;
    
    // Maximum days for auto-enrollment (30 days)
    uint256 public constant MAX_AUTO_ENROLL_DAYS = 30 days;
    
    // Maximum daily tickets for auto-enrollment
    uint256 public constant MAX_DAILY_TICKETS = 100;
    
    // Allowed tokens for payment
    mapping(address => bool) public allowedTokens;
    
    modifier onlyRaffleCore() {
        require(msg.sender == raffleCoreAddress, "AutoEnrollment: caller is not the RaffleCore contract");
        _;
    }
    
    constructor(address _raffleCoreAddress, address[] memory _allowedTokens) {
        raffleCoreAddress = _raffleCoreAddress;
        raffleCore = IRaffleCore(_raffleCoreAddress);
        
        // Set allowed tokens
        for (uint256 i = 0; i < _allowedTokens.length; i++) {
            allowedTokens[_allowedTokens[i]] = true;
        }
    }
    
    /**
     * @dev Enables auto enrollment for a user
     * @param endDate The timestamp until which auto enrollment should be active
     * @param dailyTickets The number of tickets to purchase daily
     * @param token The token to use for payments
     */
    function enableAutoEnroll(
        uint256 endDate, 
        uint256 dailyTickets, 
        address token
    ) 
        external 
        override 
    {
        require(allowedTokens[token], "AutoEnrollment: token not allowed");
        require(dailyTickets > 0 && dailyTickets <= MAX_DAILY_TICKETS, "AutoEnrollment: invalid daily tickets");
        require(endDate > block.timestamp, "AutoEnrollment: end date must be in the future");
        require(endDate <= block.timestamp + MAX_AUTO_ENROLL_DAYS, "AutoEnrollment: end date too far in the future");
        
        // Get token allowance to ensure the user has approved spending
        IERC20 tokenContract = IERC20(token);
        uint256 allowance = tokenContract.allowance(msg.sender, address(this));
        
        // Calculate maximum possible cost (daily tickets * $1 per ticket * days)
        uint256 maxDays = (endDate - block.timestamp) / 1 days + 1;
        uint256 maxCost = dailyTickets * 1e6 * maxDays; // Assumes 6 decimals for USDC/USDT
        
        require(allowance >= maxCost, "AutoEnrollment: insufficient token allowance");
        
        // Store auto-enrollment settings
        autoEnrollments[msg.sender] = AutoEnrollInfo({
            isActive: true,
            endDate: endDate,
            dailyTickets: dailyTickets,
            token: token
        });
        
        emit AutoEnrollEnabled(msg.sender, endDate, dailyTickets, token);
    }
    
    /**
     * @dev Disables auto enrollment for the caller
     */
    function disableAutoEnroll() external override {
        require(autoEnrollments[msg.sender].isActive, "AutoEnrollment: not currently enrolled");
        
        autoEnrollments[msg.sender].isActive = false;
        
        emit AutoEnrollDisabled(msg.sender);
    }
    
    /**
     * @dev Gets auto enrollment settings for a user
     * @param user The address of the user
     * @return Auto enrollment information
     */
    function getAutoEnrollInfo(address user) 
        external 
        view 
        override 
        returns (AutoEnrollInfo memory) 
    {
        return autoEnrollments[user];
    }
    
    /**
     * @dev Processes auto enrollments for a new raffle
     * @param raffleId The ID of the new raffle
     */
    function processAutoEnrollments(uint256 raffleId) 
        external 
        override 
        onlyRaffleCore 
    {
        // This function would be called by the RaffleCore contract when a new raffle starts
        
        // In a real implementation, this would either:
        // 1. Loop through all active auto-enrollments (gas intensive)
        // 2. Use a separate mechanism like a keeper to process enrollments in batches
        
        // For simplicity, we're demonstrating the approach but not implementing the full loop
        // which would be gas inefficient for many users
        
        // Example implementation for demonstration:
        // For each user with active auto-enrollment:
        //   If current time <= end date:
        //     Purchase tickets on their behalf
        //   Else:
        //     Deactivate their auto-enrollment
    }
    
    /**
     * @dev Processes auto enrollment for a specific user
     * @param user The address of the user
     * @param raffleId The ID of the raffle
     */
    function processUserAutoEnrollment(address user, uint256 raffleId) external onlyRaffleCore {
        AutoEnrollInfo storage enrollment = autoEnrollments[user];
        
        if (!enrollment.isActive) {
            return;
        }
        
        if (block.timestamp > enrollment.endDate) {
            enrollment.isActive = false;
            emit AutoEnrollDisabled(user);
            return;
        }
        
        uint256 ticketCount = enrollment.dailyTickets;
        address token = enrollment.token;
        
        // Transfer tokens from user to this contract
        uint256 amount = ticketCount * 1e6; // $1 per ticket, assuming 6 decimals for USDC/USDT
        
        IERC20 tokenContract = IERC20(token);
        
        // Check if the user has sufficient balance and allowance
        uint256 balance = tokenContract.balanceOf(user);
        uint256 allowance = tokenContract.allowance(user, address(this));
        
        if (balance < amount || allowance < amount) {
            // If insufficient funds, disable auto-enrollment
            enrollment.isActive = false;
            emit AutoEnrollDisabled(user);
            return;
        }
        
        // Transfer tokens from user to this contract
        bool success = tokenContract.transferFrom(user, address(this), amount);
        
        if (!success) {
            enrollment.isActive = false;
            emit AutoEnrollDisabled(user);
            return;
        }
        
        // Approve RaffleCore to spend these tokens
        tokenContract.approve(raffleCoreAddress, amount);
        
        // Purchase tickets via RaffleCore
        // In a real implementation, we would need a way for RaffleCore to purchase
        // tickets on behalf of a user. For now, we'll just emit the event.
        
        emit AutoTicketsPurchased(user, raffleId, ticketCount);
    }
}
