
# Raffle Smart Contracts

This directory contains the smart contracts for the raffle system.

## Contract Structure

- **RaffleCore.sol**: Main contract that manages raffle rounds, ticket purchases, and winner selection.
- **TicketManager.sol**: Manages ticket issuance and ownership tracking.
- **AutoEnrollment.sol**: Handles automatic enrollment in future raffles.
- **RandomnessProvider.sol**: Provides randomness for winner selection (uses a placeholder implementation, should be replaced with Chainlink VRF in production).
- **RaffleFactory.sol**: Factory contract for deploying new raffle systems.

## Interfaces

- **IRaffleCore.sol**: Interface for the main raffle contract.
- **ITicketManager.sol**: Interface for the ticket management contract.
- **IAutoEnrollment.sol**: Interface for the auto enrollment contract.
- **IRandomnessProvider.sol**: Interface for randomness providers.
- **IERC20.sol**: Standard ERC20 interface for token interactions.

## Deployment

To deploy the raffle system, deploy the `RaffleFactory` contract first, then call its `deployRaffle` function with the appropriate parameters:

```solidity
function deployRaffle(
    address[] memory allowedTokens,
    address buybackAddress,
    address operationsAddress,
    address creatorAddress
) 
    external 
    returns (address raffleAddress)
```

## Important Notes

1. **Randomness**: The current implementation uses a simplified randomness mechanism that is NOT secure for production. In a real deployment, use Chainlink VRF or a similar oracle.

2. **Auto-Enrollment**: The current implementation does not include gas-efficient mechanisms for processing many auto-enrollments at once. In production, consider using a keeper or similar solution.

3. **Security**: Before deploying to production, these contracts should undergo a comprehensive security audit.

4. **Prize Distribution**: The current implementation distributes prizes with this formula:
   - Winners: 95%
   - Buyback and Burn: 3%
   - Operations: 1%
   - Pool Creator: 1%

5. **Winner Groups**:
   - Double (2x prize): 10% chance
   - Equal (1x prize): 20% chance
   - None (no prize): 70% chance

## Testing

These contracts should be thoroughly tested using frameworks like Hardhat or Foundry before deployment to any public network.
