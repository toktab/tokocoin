export const CONTRACT_ADDRESS = "0xFD824d5642c5E8A9D1ec9CeC75dd291AD6cDA2c8";

export const TOKO_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
] as const;

export const SEPOLIA_CHAIN_ID = "0xaa36a7";

const USER_RPC = (import.meta.env.VITE_SEPOLIA_RPC_URL ?? "").trim();
const PUBLIC_RPCS: readonly string[] = [
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://sepolia.drpc.org",
  "https://1rpc.io/sepolia",
];

export const SEPOLIA_RPCS: readonly string[] = USER_RPC
  ? [USER_RPC, ...PUBLIC_RPCS]
  : PUBLIC_RPCS;

export const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io";

export const HISTORY_BLOCK_RANGE = USER_RPC ? 50_000n : 5_000n;
export const SEPOLIA_BLOCK_SECONDS = 12;

export const HISTORY_WINDOW_HOURS = Math.max(
  1,
  Math.round((Number(HISTORY_BLOCK_RANGE) * SEPOLIA_BLOCK_SECONDS) / 3_600),
);

export const HISTORY_BUCKET: "hour" | "day" =
  HISTORY_WINDOW_HOURS <= 48 ? "hour" : "day";
export const HISTORY_BUCKET_COUNT =
  HISTORY_BUCKET === "hour"
    ? HISTORY_WINDOW_HOURS
    : Math.max(1, Math.round(HISTORY_WINDOW_HOURS / 24));

export const HISTORY_WINDOW_LABEL =
  HISTORY_BUCKET === "hour"
    ? `last ${HISTORY_BUCKET_COUNT} hours`
    : `last ${HISTORY_BUCKET_COUNT} days`;

export const HISTORY_BLOCK_LABEL = `${Number(
  HISTORY_BLOCK_RANGE,
).toLocaleString("en-US")} blocks`;

export const MAX_FEED_ITEMS = 20;
export const TOTAL_SUPPLY_POLL_MS = 30_000;

export const FAUCET_ADDRESS: string =
  (import.meta.env.VITE_FAUCET_ADDRESS ?? "").trim();

export const BACKEND_URL: string =
  (import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3001").trim();

export const FAUCET_ABI = [
  "function claimReward(uint8 score, bytes32 articleHash, bytes signature)",
  "function claimed(bytes32) view returns (bool)",
  "function trustedSigner() view returns (address)",
  "function faucetBalance() view returns (uint256)",
  "event RewardClaimed(address indexed user, uint8 score, bytes32 indexed articleHash, uint256 reward)",
] as const;

export type Transfer = {
  id: number;
  from: string;
  to: string;
  amount: string;
  memo: string;
  timestamp: number;
  txHash?: string;
};

const SEED_NOW = Date.now();

export const SEED_TRANSFERS: Transfer[] = [
  {
    id: 1,
    from: "0x1234...5678",
    to: "0x8765...4321",
    amount: "3.5",
    memo: "Sample transfer (connect wallet to see real data)",
    timestamp: SEED_NOW - 1000 * 60 * 15,
  },
  {
    id: 2,
    from: "0xABCD...EF01",
    to: "0x0123...ABCD",
    amount: "1.2",
    memo: "Sample transfer (connect wallet to see real data)",
    timestamp: SEED_NOW - 1000 * 60 * 45,
  },
];
