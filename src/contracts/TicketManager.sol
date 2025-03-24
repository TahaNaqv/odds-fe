
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/ITicketManager.sol";

/**
 * @title TicketManager
 * @dev Manages ticket issuance and ownership for raffles
 */
contract TicketManager is ITicketManager {
    // Ticket ID counter
    uint256 private nextTicketId = 1;
    
    // Mapping from ticket ID to Ticket struct
    mapping(uint256 => Ticket) private tickets;
    
    // Mapping from raffle ID to total tickets sold
    mapping(uint256 => uint256) private raffleTotalTickets;
    
    // Mapping from raffle ID and owner to their ticket IDs
    mapping(uint256 => mapping(address => uint256[])) private ownerTickets;
    
    // Address of the RaffleCore contract that can call restricted functions
    address private raffleCore;
    
    modifier onlyRaffleCore() {
        require(msg.sender == raffleCore, "TicketManager: caller is not the RaffleCore contract");
        _;
    }
    
    constructor() {
        raffleCore = msg.sender; // The deployer should be the RaffleCore contract
    }
    
    /**
     * @dev Issues new tickets for a raffle
     * @param raffleId The ID of the raffle
     * @param buyer The address of the ticket buyer
     * @param count The number of tickets to issue
     * @return startId The ID of the first ticket
     * @return endId The ID of the last ticket
     */
    function issueTickets(
        uint256 raffleId, 
        address buyer, 
        uint256 count
    ) 
        external 
        override 
        onlyRaffleCore 
        returns (uint256 startId, uint256 endId) 
    {
        require(count > 0, "TicketManager: count must be greater than zero");
        
        startId = nextTicketId;
        endId = startId + count - 1;
        
        for (uint256 i = 0; i < count; i++) {
            uint256 ticketId = startId + i;
            
            tickets[ticketId] = Ticket({
                id: ticketId,
                raffleId: raffleId,
                owner: buyer
            });
            
            ownerTickets[raffleId][buyer].push(ticketId);
        }
        
        nextTicketId = endId + 1;
        raffleTotalTickets[raffleId] += count;
        
        return (startId, endId);
    }
    
    /**
     * @dev Gets all tickets owned by an address for a raffle
     * @param raffleId The ID of the raffle
     * @param owner The address of the ticket owner
     * @return An array of ticket IDs
     */
    function getTicketsByOwner(uint256 raffleId, address owner) 
        external 
        view 
        override 
        returns (uint256[] memory) 
    {
        return ownerTickets[raffleId][owner];
    }
    
    /**
     * @dev Gets the total number of tickets sold for a raffle
     * @param raffleId The ID of the raffle
     * @return The total number of tickets
     */
    function getTotalTickets(uint256 raffleId) 
        external 
        view 
        override 
        returns (uint256) 
    {
        return raffleTotalTickets[raffleId];
    }
    
    /**
     * @dev Gets the owner of a specific ticket
     * @param ticketId The ID of the ticket
     * @return The address of the owner
     */
    function getTicketOwner(uint256 ticketId) 
        external 
        view 
        override 
        returns (address) 
    {
        require(ticketId > 0 && ticketId < nextTicketId, "TicketManager: ticket does not exist");
        return tickets[ticketId].owner;
    }
}
