
// Token Constants
export const TOKENS = {
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Base Mainnet USDC address
  },
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    address: '0x4A3A6Dd60A34bB2Aba60D73B4C88315E9CeB6A3D' // Base Mainnet USDT address
  }
};

// Raffle Constants
export const RAFFLE = {
  ticketPrice: 1, // $1 per ticket
  windowDuration: 86400, // 24 hours in seconds
  maxTickets: 1000, // Maximum tickets per round
  maxAutoEnrollDays: 30 // Maximum days for auto-enrollment
};

// Network Constants
export const NETWORK = {
  chainId: 8453, // Base Mainnet
  chainName: 'Base',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org']
};

// Mock Data for UI Development - will be replaced with smart contract data
export const MOCK_CURRENT_RAFFLE = {
  id: 'raffle-001',
  startTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), // 12 hours ago
  endTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString(), // 12 hours from now
  ticketsSold: 423,
  maxTickets: 1000,
  prizePool: 423, // $423 (1 dollar per ticket)
};

export const MOCK_PAST_RAFFLES = [
  {
    id: 'raffle-000',
    startTime: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    ticketsSold: 752,
    maxTickets: 1000,
    prizePool: 752,
    winner: '0x3f...a4d2',
    winningTicket: 347
  },
  {
    id: 'raffle-00-1',
    startTime: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    ticketsSold: 892,
    maxTickets: 1000,
    prizePool: 892,
    winner: '0x7d...e5f1',
    winningTicket: 621
  }
];

export const MOCK_USER_ACTIVITY = [
  {
    id: 'activity-001',
    type: 'purchase',
    raffleId: 'raffle-001',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    ticketCount: 5,
    totalSpent: 5,
    token: 'USDC'
  },
  {
    id: 'activity-000',
    type: 'win',
    raffleId: 'raffle-00-1',
    timestamp: new Date(Date.now() - 37 * 3600 * 1000).toISOString(),
    prize: 892,
    winningTicket: 621
  },
  {
    id: 'activity-00-1',
    type: 'purchase',
    raffleId: 'raffle-00-1',
    timestamp: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    ticketCount: 10,
    totalSpent: 10,
    token: 'USDT'
  }
];
