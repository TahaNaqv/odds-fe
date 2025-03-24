
# Raffle System Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Scope](#scope)
- [Features & Functionality](#features--functionality)
- [Technical Documentation](#technical-documentation)
  - [Frontend Architecture](#frontend-architecture)
  - [Smart Contracts](#smart-contracts)
- [Implementation Guide](#implementation-guide)
- [Security Considerations](#security-considerations)

## Project Overview

The Raffle System is a blockchain-based daily raffle platform where users can purchase tickets for a chance to win prizes. Each raffle runs for 24 hours, after which a winner is randomly selected. The system includes advanced features like auto-enrollment and different prize multipliers.

## Scope

The raffle system consists of two main components:

1. **Smart Contracts**: Self-executing contracts deployed on the blockchain that handle ticket sales, raffle draws, prize distribution, and auto-enrollment functionality.

2. **Frontend Application**: A React-based web application that allows users to interact with the smart contracts in a user-friendly manner, providing features like purchasing tickets, viewing past raffles, and managing auto-enrollment settings.

## Features & Functionality

### Core Features

1. **Daily Raffles**
   - Each raffle runs for exactly 24 hours
   - Unlimited ticket entries per raffle
   - Fixed ticket price ($1 in USDC or USDT)

2. **Ticket Purchasing**
   - Users can purchase multiple tickets at once
   - Payments accepted in USDC and USDT stablecoins
   - Real-time ticket count and prize pool updates

3. **Winner Selection**
   - Automated random winner selection at raffle conclusion
   - Three winner groups with different prize multipliers:
     - Double (2x prize): 10% chance
     - Equal (1x prize): 20% chance
     - None (no prize): 70% chance

4. **Prize Distribution**
   - Winners: 95% of the prize pool
   - Buyback and Burn: 3% of the prize pool
   - Operations: 1% of the prize pool
   - Pool Creator: 1% of the prize pool

5. **Auto-Enrollment**
   - Users can set up automatic entry into future raffles
   - Customizable end date (up to 30 days)
   - Daily ticket quantity configuration
   - Automatic disabling if insufficient funds

6. **User Activity Tracking**
   - Purchase history
   - Winning records
   - Ticket ownership details

### User Experience

1. **Current Raffle Display**
   - Real-time countdown timer
   - Live ticket sales counter
   - Current prize pool display

2. **Past Raffle History**
   - List of completed raffles
   - Winner information
   - Prize distribution details

3. **Personal Activity**
   - Ticket purchase history
   - Winning history
   - Auto-enrollment status

## Technical Documentation

### Frontend Architecture

#### Technology Stack
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Query + React Context
- **Routing**: React Router

#### Key Components

1. **Pages**
   - `Index.tsx`: Home page with current raffle and ticket purchase
   - `RaffleHistory.tsx`: List of past raffles
   - `PastActivity.tsx`: User's activity history
   - `ActivityPreviewPage.tsx`: Preview of user activity

2. **Components**
   - `RaffleCard.tsx`: Displays raffle information
   - `TicketPurchase.tsx`: Ticket purchasing interface
   - `AutoEnroll.tsx`: Auto-enrollment management
   - `ActivityList.tsx`: List of user activities

3. **Hooks**
   - `useRaffle.tsx`: Main hook for raffle operations
   - `useRaffleData.ts`: Manages raffle data fetching
   - `useTicketPurchase.ts`: Handles ticket purchasing
   - `useAutoEnroll.ts`: Manages auto-enrollment operations
   - `useWallet.tsx`: Wallet connection and management

4. **Utils**
   - `constants.ts`: Application constants
   - `helpers.ts`: Utility functions

#### Data Flow

1. **Wallet Connection**
   - Connect wallet using the `useWallet` hook
   - Check for correct network (Base)

2. **Raffle Data Fetching**
   - Current raffle data loaded on application init
   - Past raffles loaded as needed
   - User activity loaded after wallet connection

3. **Ticket Purchasing**
   - Select ticket quantity
   - Optionally enable auto-enrollment
   - Process purchase through smart contract
   - Update UI with new ticket information

4. **Auto-Enrollment**
   - Configure daily ticket quantity
   - Set end date for auto-enrollment
   - Enable/disable as needed

### Smart Contracts

#### Contract Architecture

1. **Main Contracts**

   - **RaffleCore**: Central contract managing raffles, ticket sales, and prize distribution
   - **TicketManager**: Handles ticket issuance and ownership tracking
   - **AutoEnrollment**: Manages automatic entry into future raffles
   - **RandomnessProvider**: Provides secure randomness for winner selection
   - **RaffleFactory**: Factory contract for deploying new raffle systems

2. **Interfaces**

   - **IRaffleCore**: Interface for the main raffle contract
   - **ITicketManager**: Interface for ticket management
   - **IAutoEnrollment**: Interface for auto-enrollment functionality
   - **IRandomnessProvider**: Interface for randomness providers
   - **IERC20**: Standard interface for ERC20 token operations

#### Smart Contract Details

1. **RaffleCore.sol**

   ```solidity
   // Main contract managing raffle rounds
   function startNewRaffle() public
   function purchaseTickets(uint256 count, address token) external
   function drawRaffle() public
   function finalizeRaffle(uint256 raffleId) public
   function distributePrize(uint256 raffleId, address winner, WinnerGroup winnerGroup) private
   ```

2. **TicketManager.sol**

   ```solidity
   // Manages ticket issuance and ownership
   function issueTickets(uint256 raffleId, address buyer, uint256 count) external returns (uint256 startId, uint256 endId)
   function getTicketsByOwner(uint256 raffleId, address owner) external view returns (uint256[] memory)
   function getTotalTickets(uint256 raffleId) external view returns (uint256)
   function getTicketOwner(uint256 ticketId) external view returns (address)
   ```

3. **AutoEnrollment.sol**

   ```solidity
   // Handles automatic entry into future raffles
   function enableAutoEnroll(uint256 endDate, uint256 dailyTickets, address token) external
   function disableAutoEnroll() external
   function getAutoEnrollInfo(address user) external view returns (AutoEnrollInfo memory)
   function processAutoEnrollments(uint256 raffleId) external
   function processUserAutoEnrollment(address user, uint256 raffleId) external
   ```

4. **RandomnessProvider.sol**

   ```solidity
   // Provides randomness for winner selection
   function requestRandomness() external returns (bytes32 requestId)
   function isRandomnessAvailable(bytes32 requestId) external view returns (bool)
   function getRandomness(bytes32 requestId) external view returns (uint256)
   ```

#### Contract Workflow

1. **Raffle Lifecycle**
   - New raffle starts (24-hour duration)
   - Users purchase tickets
   - Auto-enrollments processed
   - Raffle ends, randomness requested
   - Winner selected, prize distributed
   - New raffle starts automatically

2. **Ticket Purchase Process**
   - User approves token spending
   - Contract transfers tokens from user
   - Tickets issued to user
   - Raffle state updated

3. **Auto-Enrollment Process**
   - User enables auto-enrollment with parameters
   - Each new raffle triggers auto-enrollment check
   - If active, tokens transferred and tickets issued
   - If insufficient funds, auto-enrollment disabled

4. **Winner Selection Process**
   - Randomness requested from provider
   - Random value used to select winning ticket
   - Another random value determines winner group
   - Prize distributed according to winner group

## Implementation Guide

### Smart Contract Deployment

1. Deploy RaffleFactory contract
2. Call deployRaffle function with parameters:
   - Allowed tokens (USDC, USDT addresses)
   - Treasury addresses (buyback, operations, creator)
3. Factory will deploy:
   - RaffleCore
   - TicketManager
   - AutoEnrollment
   - RandomnessProvider

### Frontend Integration

1. Connect to user's wallet
2. Load contract ABIs
3. Create contract instances
4. Implement contract interaction functions:
   - purchaseTickets
   - enableAutoEnroll
   - disableAutoEnroll
   - getRaffleInfo
   - etc.

## Security Considerations

1. **Smart Contract Security**
   - Replace the placeholder RandomnessProvider with Chainlink VRF in production
   - Implement comprehensive testing using Hardhat or Foundry
   - Conduct a professional security audit before mainnet deployment
   - Implement emergency pause functionality
   - Consider using OpenZeppelin contracts for standard functionality

2. **Frontend Security**
   - Implement proper error handling for all contract interactions
   - Add transaction confirmation and receipt handling
   - Validate all user inputs before sending to contracts
   - Implement wallet connection security best practices

3. **Auto-Enrollment Considerations**
   - The current implementation processes auto-enrollments one by one, which is gas inefficient
   - In production, consider implementing a gas-efficient batch processing mechanism
   - Consider implementing a keeper or similar solution for processing auto-enrollments

4. **Randomness Security**
   - The current RandomnessProvider is a simplified implementation for development
   - In production, use Chainlink VRF or a similar secure oracle
   - Ensure the randomness source cannot be manipulated by validators or miners
