# TokoCoin - ERC20 Test Token

A simple ERC20 token implementation using Hardhat and Solidity.

## Token Details

- **Name:** TokoCoin
- **Symbol:** TOKO
- **Total Supply:** 14 tokens (14 * 10^18 wei)
- **Decimals:** 18 (standard ERC20)
- **All tokens assigned to:** Funding Wallet (specified during deployment)

## Project Setup

This project uses:
- Hardhat v2.22.0
- Solidity v0.8.20
- OpenZeppelin Contracts for ERC20 implementation

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Usage

### Compile the Contract

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

The test suite includes:
- Token name and symbol verification
- Total supply verification
- Funding wallet assignment
- Token transfer functionality
- Insufficient balance handling

### Deploy to Local Hardhat Network

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

This will:
1. Deploy the TokoCoin contract to the local Hardhat test network
2. Assign all 14 tokens to the funding wallet (second account)
3. Display deployment information including contract address and balances

## Deployment on Sepolia Testnet

The token has been successfully deployed to the Ethereum Sepolia testnet:

- **Contract Address:** `0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5`
- **Network:** Sepolia Testnet
- **View on Etherscan:** [https://sepolia.etherscan.io/address/0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5](https://sepolia.etherscan.io/address/0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5)

### Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

This requires:
- `.env` file with `PRIVATE_KEY` and `ALCHEMY_API_URL`
- Sepolia test ETH for gas fees
- Alchemy API configured for Sepolia network

### Send Tokens

Use the included script to send tokens:

```bash
npx hardhat run scripts/sendTokens.js --network sepolia
```

## Contract Details

The TokoCoin contract (`contracts/TokoCoin.sol`) inherits from OpenZeppelin's ERC20 implementation and:
- Mints the total supply of 14 tokens to the funding wallet upon deployment
- Stores the funding wallet address as a public variable
- Uses standard ERC20 functionality for transfers and balance queries

## Test Results

All 6 tests passing:
- ✓ Should set the right token name and symbol
- ✓ Should assign the total supply to the funding wallet
- ✓ Should have correct funding wallet address
- ✓ Should have 18 decimals
- ✓ Should transfer tokens between accounts
- ✓ Should fail if sender doesn't have enough tokens
