
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title ITicketManager
 * @dev Interface for the ticket management contract
 */
interface ITicketManager {
    struct Ticket {
        uint256 id;
        uint256 raffleId;
        address owner;
    }
    
    /**
     * @dev Issues new tickets for a raffle
     * @param raffleId The ID of the raffle
     * @param buyer The address of the ticket buyer
     * @param count The number of tickets to issue
     * @return startId The ID of the first ticket
     * @return endId The ID of the last ticket
     */
    function issueTickets(uint256 raffleId, address buyer, uint256 count) external returns (uint256 startId, uint256 endId);
    
    /**
     * @dev Gets all tickets owned by an address for a raffle
     * @param raffleId The ID of the raffle
     * @param owner The address of the ticket owner
     * @return An array of ticket IDs
     */
    function getTicketsByOwner(uint256 raffleId, address owner) external view returns (uint256[] memory);
    
    /**
     * @dev Gets the total number of tickets sold for a raffle
     * @param raffleId The ID of the raffle
     * @return The total number of tickets
     */
    function getTotalTickets(uint256 raffleId) external view returns (uint256);
    
    /**
     * @dev Gets the owner of a specific ticket
     * @param ticketId The ID of the ticket
     * @return The address of the owner
     */
    function getTicketOwner(uint256 ticketId) external view returns (address);
}
