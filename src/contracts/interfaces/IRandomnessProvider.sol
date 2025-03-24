
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IRandomnessProvider
 * @dev Interface for randomness providers (Chainlink VRF, etc.)
 */
interface IRandomnessProvider {
    /**
     * @dev Requests randomness and returns a request ID
     */
    function requestRandomness() external returns (bytes32 requestId);
    
    /**
     * @dev Checks if randomness is available for a request
     * @param requestId The ID of the randomness request
     * @return True if randomness is available
     */
    function isRandomnessAvailable(bytes32 requestId) external view returns (bool);
    
    /**
     * @dev Gets the random value for a request
     * @param requestId The ID of the randomness request
     * @return The random value
     */
    function getRandomness(bytes32 requestId) external view returns (uint256);
}
