
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./RaffleCore.sol";
import "./RandomnessProvider.sol";

/**
 * @title RaffleFactory
 * @dev Factory contract to deploy new raffle systems
 */
contract RaffleFactory {
    address[] public deployedRaffles;
    
    event RaffleDeployed(
        address indexed raffleAddress,
        address indexed creator,
        address randomnessProvider,
        address[] allowedTokens,
        address buybackAddress,
        address operationsAddress,
        address creatorAddress
    );
    
    /**
     * @dev Deploys a new raffle system
     * @param allowedTokens Array of allowed payment tokens
     * @param buybackAddress Address for buyback share
     * @param operationsAddress Address for operations share
     * @param creatorAddress Address for creator share
     * @return raffleAddress Address of the deployed raffle
     */
    function deployRaffle(
        address[] memory allowedTokens,
        address buybackAddress,
        address operationsAddress,
        address creatorAddress
    ) 
        external 
        returns (address raffleAddress) 
    {
        // Deploy randomness provider
        RandomnessProvider randomnessProvider = new RandomnessProvider();
        
        // Deploy raffle core
        RaffleCore raffleCore = new RaffleCore(
            address(randomnessProvider),
            allowedTokens,
            buybackAddress,
            operationsAddress,
            creatorAddress
        );
        
        raffleAddress = address(raffleCore);
        deployedRaffles.push(raffleAddress);
        
        emit RaffleDeployed(
            raffleAddress,
            msg.sender,
            address(randomnessProvider),
            allowedTokens,
            buybackAddress,
            operationsAddress,
            creatorAddress
        );
        
        return raffleAddress;
    }
    
    /**
     * @dev Gets the count of deployed raffles
     * @return The number of deployed raffles
     */
    function getRaffleCount() external view returns (uint256) {
        return deployedRaffles.length;
    }
}
