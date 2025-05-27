// Token Constants
export const TOKENS = {
  mUSDC: {
    name: "Mock USDC",
    symbol: "mUSDC",
    decimals: 6,
    address: "0x86a9fED675D2239B6D7D9f184E50C8217C41D4e6", // Base Testnet USDC address
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // Base Mainnet USDC address
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    address: "0x4A3A6Dd60A34bB2Aba60D73B4C88315E9CeB6A3D", // Base Mainnet USDT address
  },
};

// Raffle Constants
export const RAFFLE = {
  ticketPrice: 1, // $1 per ticket
  targetAmount: 1000, // $1000 per raffle round
  maxTickets: 1000, // Max tickets per round (equal to target amount / ticket price)
  maxAutoEnrollDays: 30, // Maximum days for auto-enrollment
  prizeDistribution: {
    winners: 95, // 95% to winners
    buybackAndBurn: 3, // 3% to buyback and burn
    operations: 1, // 1% to operations
    poolCreator: 1, // 1% to pool creator
  },
  winnerGroups: {
    groupOne: { multiplier: 2, name: "Double" }, // Double the ticket value
    groupTwo: { multiplier: 1, name: "Equal" }, // Equal to ticket value
    groupThree: { multiplier: 0, name: "None" }, // No winnings
  },
};

// Network Constants
const BASE_MAINNET = {
  chainId: 8453, // Base Mainnet
  chainName: "Base",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.base.org"],
  blockExplorerUrls: ["https://basescan.org"],
};

const BASE_TESTNET = {
  chainId: 84532,
  chainName: "Base Sepolia",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
};

export const NETWORK = BASE_TESTNET;

// Mock Data for UI Development - will be replaced with smart contract data
export const MOCK_CURRENT_RAFFLE = {
  id: "raffle-001",
  startTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), // 12 hours ago
  endTime: null, // No fixed end time, ends when target amount is reached
  ticketsSold: 423,
  maxTickets: 1000,
  targetAmount: 1000,
  prizePool: 423, // $423 (1 dollar per ticket)
  progress: 42.3, // Percentage of target amount reached
};

export const MOCK_PAST_RAFFLES = [
  {
    id: "raffle-000",
    startTime: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    ticketsSold: 752,
    maxTickets: 1000,
    targetAmount: 1000,
    prizePool: 1000, // Raffle completed at $1000
    progress: 100,
    winner: "0x3f...a4d2",
    winningTicket: 347,
    winnerGroup: "Double",
  },
  {
    id: "raffle-00-1",
    startTime: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    ticketsSold: 1000,
    maxTickets: 1000,
    targetAmount: 1000,
    prizePool: 1000,
    progress: 100,
    winner: "0x7d...e5f1",
    winningTicket: 621,
    winnerGroup: "Equal",
  },
];

export const MOCK_USER_ACTIVITY = [
  {
    id: "activity-001",
    type: "purchase",
    raffleId: "raffle-001",
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    ticketCount: 5,
    totalSpent: 5,
    token: "USDC",
    ticketIds: [1001, 1002, 1003, 1004, 1005],
  },
  {
    id: "activity-000",
    type: "win",
    raffleId: "raffle-00-1",
    timestamp: new Date(Date.now() - 37 * 3600 * 1000).toISOString(),
    prize: 892,
    winningTicket: 621,
    winnerGroup: "Equal",
  },
  {
    id: "activity-00-1",
    type: "purchase",
    raffleId: "raffle-00-1",
    timestamp: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    ticketCount: 10,
    totalSpent: 10,
    token: "USDT",
    ticketIds: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
  },
];
