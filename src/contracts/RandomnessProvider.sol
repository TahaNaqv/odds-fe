
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IRandomnessProvider.sol";

/**
 * @title RandomnessProvider
 * @dev Provides randomness for the raffle contract
 * NOTE: This is a simplified implementation. In production, use Chainlink VRF or a similar oracle.
 */
contract RandomnessProvider is IRandomnessProvider {
    mapping(bytes32 => uint256) private randomResults;
    mapping(bytes32 => bool) private resultAvailable;
    
    address private owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "RandomnessProvider: caller is not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Requests randomness and returns a request ID
     * In a real implementation, this would send a request to Chainlink VRF
     */
    function requestRandomness() external override returns (bytes32 requestId) {
        // In a real implementation with Chainlink VRF, we would request randomness
        // and store the requestId for later fulfillment
        requestId = keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender));
        
        // For testing/demo purposes, we immediately provide a random value
        // DO NOT USE THIS IN PRODUCTION - it's not secure
        fulfillRandomness(requestId, uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))));
        
        return requestId;
    }
    
    /**
     * @dev Fulfills a randomness request with the provided random value
     * In a real implementation, this would be called by the Chainlink VRF callback
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomValue) internal {
        randomResults[requestId] = randomValue;
        resultAvailable[requestId] = true;
    }
    
    /**
     * @dev Checks if randomness is available for a request
     */
    function isRandomnessAvailable(bytes32 requestId) external view override returns (bool) {
        return resultAvailable[requestId];
    }
    
    /**
     * @dev Gets the random value for a request
     */
    function getRandomness(bytes32 requestId) external view override returns (uint256) {
        require(resultAvailable[requestId], "RandomnessProvider: randomness not available yet");
        return randomResults[requestId];
    }
}
