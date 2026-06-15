# TokoCoin Project Overview for AI Analysis

## Quick Summary
This is a complete Hardhat project with an ERC20 token called **TokoCoin** (TOKO) with a total supply of 14 tokens assigned to a funding wallet.

## Essential Files to Review

### 1. Smart Contract
- `contracts/TokoCoin.sol` - Main ERC20 token contract

### 2. Configuration
- `hardhat.config.js` - Hardhat configuration (Solidity 0.8.20, local network)
- `package.json` - Node.js dependencies

### 3. Scripts & Tests
- `scripts/deploy.js` - Deployment script for local Hardhat network
- `test/TokoCoin.test.js` - Test suite (6 tests, all passing)

## Key Commands

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy locally
npx hardhat run scripts/deploy.js --network hardhat
```

## Token Specifications
- **Name:** TokoCoin
- **Symbol:** TOKO
- **Decimals:** 18
- **Total Supply:** 14 tokens (14 * 10^18 wei)
- **Initial Distribution:** 100% to funding wallet address (provided at deployment)
- **Standard:** ERC20 (OpenZeppelin implementation)

## Project Status
✅ Part 1 Complete: Local development and testing  
✅ Part 2 Complete: Deployed to Sepolia testnet  
⏳ Part 3 Pending: Website development

## Sepolia Deployment Details
- **Contract Address:** 0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5
- **Network:** Ethereum Sepolia Testnet
- **Total Supply:** 14 TOKO
- **Deployed to:** 0xFD824d5642c5E8A9D1ec9CeC75dd291AD6cDA2c8
- **Transaction:** [View on Etherscan](https://sepolia.etherscan.io/address/0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5)

## Technology Stack
- **Framework:** Hardhat 2.22.0
- **Language:** Solidity 0.8.20
- **Standards:** OpenZeppelin Contracts
- **Testing:** Chai + Hardhat toolbox
- **Network:** Local Hardhat test network

## What's Excluded (in .gitignore)
- `node_modules/` - npm dependencies (594 packages, ~200MB)
- `cache/` and `artifacts/` - Hardhat build outputs
- Various logs and temporary files

## Notes for Other AI
This is a minimal, clean ERC20 implementation perfect for testing and demonstration. The contract is intentionally simple - it mints all tokens to a funding wallet at deployment and relies on OpenZeppelin's battle-tested ERC20 base contract for all standard functionality.
