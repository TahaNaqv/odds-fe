
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IAutoEnrollment
 * @dev Interface for the auto enrollment contract
 */
interface IAutoEnrollment {
    struct AutoEnrollInfo {
        bool isActive;
        uint256 endDate;
        uint256 dailyTickets;
        address token;
    }
    
    event AutoEnrollEnabled(address indexed user, uint256 endDate, uint256 dailyTickets, address token);
    event AutoEnrollDisabled(address indexed user);
    event AutoTicketsPurchased(address indexed user, uint256 indexed raffleId, uint256 count);
    
    /**
     * @dev Enables auto enrollment for a user
     * @param endDate The timestamp until which auto enrollment should be active
     * @param dailyTickets The number of tickets to purchase daily
     * @param token The token to use for payments
     */
    function enableAutoEnroll(uint256 endDate, uint256 dailyTickets, address token) external;
    
    /**
     * @dev Disables auto enrollment for the caller
     */
    function disableAutoEnroll() external;
    
    /**
     * @dev Gets auto enrollment settings for a user
     * @param user The address of the user
     * @return Auto enrollment information
     */
    function getAutoEnrollInfo(address user) external view returns (AutoEnrollInfo memory);
    
    /**
     * @dev Processes auto enrollments for a new raffle
     * @param raffleId The ID of the new raffle
     */
    function processAutoEnrollments(uint256 raffleId) external;
}
