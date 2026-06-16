export type Article = {
  id: number;
  title: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
};

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "What is Blockchain?",
    text: "A blockchain is a distributed digital ledger that records transactions across many computers. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. This structure makes it resistant to modification of the data. Blockchain technology was first outlined in 1991 by Stuart Haber and W. Scott Stornetta, but it gained mainstream attention with Bitcoin in 2009. The key innovation is that no single entity controls the network — consensus is reached through mechanisms like Proof of Work or Proof of Stake. Blockchains are transparent, immutable, and decentralized, making them useful for cryptocurrency, supply chain tracking, and digital identity verification. The transparency of a public blockchain means anyone can view the transaction history, while privacy-focused blockchains like Monero use advanced cryptography to obscure transaction details.",
    questions: [
      {
        question: "What makes blockchain data resistant to modification?",
        options: ["Centralized control", "Each block contains a cryptographic hash of the previous block", "Only one copy of the ledger exists", "A single administrator approves all changes"],
        correctIndex: 1,
        explanation: "The cryptographic hash links each block to the previous one, so changing any block would invalidate all subsequent blocks.",
      },
      {
        question: "When was blockchain technology first outlined?",
        options: ["2009", "1991", "2015", "2001"],
        correctIndex: 1,
        explanation: "Stuart Haber and W. Scott Stornetta first described blockchain in 1991, long before Bitcoin.",
      },
      {
        question: "How do blockchains reach consensus without a central authority?",
        options: ["Through a CEO making decisions", "Via consensus mechanisms like Proof of Work or Proof of Stake", "By voting on social media", "Through random selection"],
        correctIndex: 1,
        explanation: "Consensus mechanisms allow distributed networks to agree on the valid state of the blockchain without a central authority.",
      },
      {
        question: "Which was the first blockchain to gain mainstream attention?",
        options: ["Ethereum", "Litecoin", "Bitcoin", "Dogecoin"],
        correctIndex: 2,
        explanation: "Bitcoin, launched in 2009, was the first blockchain to achieve widespread adoption and mainstream attention.",
      },
      {
        question: "What does the transparency of a public blockchain mean?",
        options: ["Only the government can view transactions", "Anyone can view the transaction history", "Transactions are hidden until approved", "Only miners can see the data"],
        correctIndex: 1,
        explanation: "Public blockchains allow anyone to view the entire transaction history, ensuring full transparency.",
      },
    ],
  },
  {
    id: 2,
    title: "Ethereum and Smart Contracts",
    text: "Ethereum is a decentralized blockchain platform that extends beyond simple value transfer by supporting smart contracts. Proposed by Vitalik Buterin in 2013 and launched in 2015, Ethereum enables developers to build decentralized applications (dApps) that run exactly as programmed without downtime or third-party interference. Smart contracts are self-executing contracts where the terms are written directly into code. They automatically enforce agreements when predefined conditions are met. Ethereum uses the Ethereum Virtual Machine (EVM) to execute these contracts. The native currency, Ether (ETH), powers the network and pays for computation. Ethereum transitioned from Proof of Work to Proof of Stake in 2022 through an upgrade called The Merge, reducing energy consumption by over 99 percent. ERC20 is the standard for fungible tokens on Ethereum.",
    questions: [
      {
        question: "Who proposed Ethereum?",
        options: ["Satoshi Nakamoto", "Vitalik Buterin", "Charles Hoskinson", "Gavin Wood"],
        correctIndex: 1,
        explanation: "Vitalik Buterin proposed Ethereum in 2013 when he was just 19 years old.",
      },
      {
        question: "What executes smart contracts on Ethereum?",
        options: ["The Ethereum Virtual Machine (EVM)", "The Bitcoin Script interpreter", "A centralized server", "AWS Lambda"],
        correctIndex: 0,
        explanation: "The Ethereum Virtual Machine (EVM) executes smart contract code across all network nodes.",
      },
      {
        question: "What was The Merge?",
        options: ["Ethereum splitting into two chains", "Ethereum transitioning from Proof of Work to Proof of Stake", "Bitcoin merging with Ethereum", "A new token standard"],
        correctIndex: 1,
        explanation: "The Merge in 2022 transitioned Ethereum to Proof of Stake, cutting energy usage by over 99%.",
      },
      {
        question: "What does ERC20 refer to?",
        options: ["An Ethereum improvement proposal for gas fees", "The standard for fungible tokens on Ethereum", "A type of smart contract wallet", "Ethereum's consensus algorithm"],
        correctIndex: 1,
        explanation: "ERC20 is the technical standard for fungible tokens on Ethereum, which TOKO Coin follows.",
      },
      {
        question: "What is a key property of smart contracts?",
        options: ["They require manual execution", "They self-execute when conditions are met", "They can be modified after deployment", "They need a lawyer to interpret"],
        correctIndex: 1,
        explanation: "Smart contracts automatically execute when predefined conditions are met, with no need for intermediaries.",
      },
    ],
  },
  {
    id: 3,
    title: "How Cryptocurrency Wallets Work",
    text: "A cryptocurrency wallet manages the private and public keys needed to interact with blockchain networks. Despite the name, wallets do not store coins — they store the cryptographic keys that prove ownership of tokens on the blockchain. A public key (derived from an address) is shared with others to receive funds, while the private key must be kept secret as it authorizes transactions. Wallets come in several forms: hardware wallets like Ledger store keys offline for maximum security; software wallets like MetaMask run as browser extensions; and paper wallets are printed QR codes. When you send cryptocurrency, your wallet signs the transaction with your private key and broadcasts it to the network. Seed phrases (12 or 24 words) are standardized backups that can restore access to any wallet that follows the BIP39 or BIP44 standards.",
    questions: [
      {
        question: "What do cryptocurrency wallets actually store?",
        options: ["The coins themselves", "Cryptographic keys (private and public)", "Login passwords", "Bank account numbers"],
        correctIndex: 1,
        explanation: "Wallets store cryptographic keys, not the actual coins. The tokens exist on the blockchain.",
      },
      {
        question: "What authorizes a transaction in a wallet?",
        options: ["The public key", "The private key", "The wallet password", "Email verification"],
        correctIndex: 1,
        explanation: "The private key is used to sign transactions, cryptographically proving ownership.",
      },
      {
        question: "What is an example of a software wallet?",
        options: ["Ledger", "MetaMask", "Trezor", "A bank vault"],
        correctIndex: 1,
        explanation: "MetaMask is a popular browser extension software wallet for interacting with dApps.",
      },
      {
        question: "What are seed phrases used for?",
        options: ["Generating random numbers", "Backing up and restoring wallet access", "Encrypting internet traffic", "Creating new cryptocurrencies"],
        correctIndex: 1,
        explanation: "Seed phrases (12-24 words following BIP39/BIP44) can restore full wallet access on any compatible wallet.",
      },
      {
        question: "What happens when you send cryptocurrency from your wallet?",
        options: ["The coins are emailed", "The wallet signs the transaction with your private key", "You call your bank", "The coins are physically mailed"],
        correctIndex: 1,
        explanation: "Your wallet signs a transaction with your private key and broadcasts it to the network for confirmation.",
      },
    ],
  },
  {
    id: 4,
    title: "Proof of Work vs Proof of Stake",
    text: "Proof of Work (PoW) and Proof of Stake (PoS) are consensus mechanisms that secure blockchain networks. In PoW, miners compete to solve complex mathematical puzzles using computational power. The first to solve the puzzle validates the block and receives rewards. Bitcoin and the original Ethereum used PoW. The main criticism is massive energy consumption — Bitcoin uses as much electricity as some small countries. In PoS, validators lock up (stake) their own cryptocurrency as collateral. The network randomly selects validators to propose blocks based on how much they have staked. If a validator acts dishonestly, their stake is slashed. PoS is far more energy-efficient and is used by Ethereum since The Merge. Cardano and Polkadot also use PoS variants. Both mechanisms prevent the double-spending problem without a central authority.",
    questions: [
      {
        question: "What do miners compete with in Proof of Work?",
        options: ["Staked coins", "Computational power", "Voting rights", "Reputation scores"],
        correctIndex: 1,
        explanation: "PoW miners use computational power to solve mathematical puzzles, consuming significant electricity.",
      },
      {
        question: "What happens to validators who act dishonestly in PoS?",
        options: ["They get a warning", "Their stake is slashed", "They are banned permanently", "They pay a fine to the government"],
        correctIndex: 1,
        explanation: "In PoS, validators who misbehave have their staked cryptocurrency slashed, providing an economic disincentive.",
      },
      {
        question: "Which consensus mechanism does Bitcoin use?",
        options: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake", "Proof of Authority"],
        correctIndex: 1,
        explanation: "Bitcoin uses Proof of Work, where miners compete with computational power to validate blocks.",
      },
      {
        question: "What is a major advantage of Proof of Stake over Proof of Work?",
        options: ["Higher energy consumption", "Lower energy consumption", "More centralization", "Faster internet speeds"],
        correctIndex: 1,
        explanation: "PoS is dramatically more energy-efficient than PoW because it doesn't require intensive computation.",
      },
      {
        question: "What problem do both PoW and PoS solve?",
        options: ["Internet connectivity", "The double-spending problem", "Password security", "Email spam"],
        correctIndex: 1,
        explanation: "Both mechanisms prevent double-spending — ensuring the same digital asset cannot be spent twice.",
      },
    ],
  },
  {
    id: 5,
    title: "Decentralized Finance (DeFi)",
    text: "Decentralized Finance, or DeFi, refers to financial services built on blockchain networks that operate without traditional intermediaries like banks. DeFi platforms use smart contracts to offer lending, borrowing, trading, and earning interest. Users retain full control of their funds through their wallets. Popular DeFi applications include Uniswap (decentralized exchange), Aave (lending), and MakerDAO (stablecoin). Total value locked (TVL) in DeFi peaked at over $180 billion in 2021. Liquidity pools, where users provide tokens to facilitate trading, are a core innovation. Liquidity providers earn fees from trades. Yield farming involves moving funds between protocols to maximize returns. DeFi faces risks including smart contract bugs, price volatility, and regulatory uncertainty. Despite these challenges, DeFi has brought financial access to millions of unbanked people worldwide.",
    questions: [
      {
        question: "What does DeFi stand for?",
        options: ["Definite Finance", "Decentralized Finance", "Digital Finance", "Direct Finance"],
        correctIndex: 1,
        explanation: "DeFi stands for Decentralized Finance — financial services without traditional intermediaries.",
      },
      {
        question: "What is Uniswap an example of?",
        options: ["A centralized bank", "A decentralized exchange (DEX)", "A hardware wallet", "A mining pool"],
        correctIndex: 1,
        explanation: "Uniswap is a popular decentralized exchange that uses automated liquidity pools for token swaps.",
      },
      {
        question: "What is Total Value Locked (TVL)?",
        options: ["Bitcoin's market cap", "The total value of assets deposited in DeFi protocols", "Ethereum's transaction fees", "The number of blockchain users"],
        correctIndex: 1,
        explanation: "TVL measures the total value of assets locked in DeFi smart contracts, indicating ecosystem growth.",
      },
      {
        question: "What do liquidity providers earn?",
        options: ["Interest from their bank", "Fees from trades in the pool", "Monthly salary", "Dividend checks"],
        correctIndex: 1,
        explanation: "Liquidity providers earn a portion of trading fees generated by the liquidity pool.",
      },
      {
        question: "What is a risk associated with DeFi?",
        options: ["Too many regulations", "Smart contract bugs and vulnerabilities", "Excessive bank oversight", "Physical theft of hardware"],
        correctIndex: 1,
        explanation: "Smart contract bugs are a major DeFi risk — if the code has vulnerabilities, funds can be stolen.",
      },
    ],
  },
  {
    id: 6,
    title: "What Are Gas Fees?",
    text: "Gas fees are payments made by users to compensate for the computational energy required to process and validate transactions on a blockchain network. On Ethereum, gas is measured in units called gwei (one billionth of an ETH). Each operation — from simple transfers to complex smart contract interactions — costs a specific amount of gas. The total fee equals gas units multiplied by the gas price. When the network is congested, users can pay higher gas prices to prioritize their transactions. EIP-1559, implemented in 2021, reformed Ethereum's fee market by burning a base fee and allowing an optional priority tip to validators. Layer 2 solutions like Arbitrum and Optimism reduce fees by processing transactions off-chain before settling on the main Ethereum chain. Understanding gas fees is essential for using Ethereum-based applications effectively.",
    questions: [
      {
        question: "What are gas fees for?",
        options: ["Fueling cars", "Compensating for computational energy to process transactions", "Paying for internet access", "Buying tokens"],
        correctIndex: 1,
        explanation: "Gas fees compensate the network for the computational resources needed to process transactions.",
      },
      {
        question: "What unit is gas measured in on Ethereum?",
        options: ["Satoshis", "Gwei", "Wei", "Bits"],
        correctIndex: 1,
        explanation: "Gas is measured in gwei, where 1 gwei equals one-billionth of an ETH.",
      },
      {
        question: "What did EIP-1559 introduce?",
        options: ["Proof of Stake", "A base fee that gets burned plus an optional priority tip", "Smart contracts", "Bitcoin compatibility"],
        correctIndex: 1,
        explanation: "EIP-1559 introduced a base fee (burned) and a priority tip for validators, reforming the fee market.",
      },
      {
        question: "How can you get your transaction processed faster during congestion?",
        options: ["Send fewer tokens", "Pay a higher gas price", "Use Bitcoin instead", "Wait for a holiday"],
        correctIndex: 1,
        explanation: "Paying a higher gas price incentivizes validators to prioritize your transaction during congestion.",
      },
      {
        question: "What do Layer 2 solutions like Arbitrum do?",
        options: ["Replace Ethereum entirely", "Process transactions off-chain then settle on Ethereum", "Mine new Ether", "Store files"],
        correctIndex: 1,
        explanation: "Layer 2 solutions process transactions off-chain and batch them to Ethereum, reducing fees significantly.",
      },
    ],
  },
  {
    id: 7,
    title: "What is a Testnet?",
    text: "A testnet is an alternative blockchain network used exclusively for testing purposes. Testnets replicate the functionality of the main network (mainnet) but use valueless tokens. Developers use testnets to deploy and experiment with smart contracts without risking real funds. Sepolia is Ethereum's recommended testnet, replacing the deprecated Ropsten and Rinkeby. It uses Proof of Stake consensus and has a consistent block time of 12 seconds. Testnet ETH can be obtained from faucets — web applications that dispense free test ETH. Testnets are crucial for blockchain education, allowing students to practice deploying contracts, sending tokens, and interacting with dApps without financial risk. When a project is ready for production, it deploys the same smart contract code to mainnet. TOKO Coin is deployed on Sepolia for exactly this educational purpose.",
    questions: [
      {
        question: "What is a testnet used for?",
        options: ["Mining real Bitcoin", "Testing blockchain applications without real funds", "Storing passwords", "Running a web server"],
        correctIndex: 1,
        explanation: "Testnets allow developers to test applications using valueless tokens before mainnet deployment.",
      },
      {
        question: "Which testnet does Ethereum currently recommend?",
        options: ["Ropsten", "Rinkeby", "Sepolia", "Goerli"],
        correctIndex: 2,
        explanation: "Sepolia is Ethereum's recommended testnet as of 2024, replacing deprecated testnets.",
      },
      {
        question: "Where can you get testnet ETH?",
        options: ["From exchanges", "From faucets that dispense free test ETH", "By mining it", "By buying it with fiat"],
        correctIndex: 1,
        explanation: "Testnet faucets dispense free test ETH for development and testing purposes.",
      },
      {
        question: "Why are testnets important for education?",
        options: ["They make money", "Students can practice without financial risk", "They are faster than mainnet", "They have no transaction fees"],
        correctIndex: 1,
        explanation: "Testnets let students safely experiment with blockchain technology without risking real funds.",
      },
      {
        question: "Which network is TOKO Coin deployed on?",
        options: ["Ethereum mainnet", "Sepolia testnet", "Bitcoin mainnet", "Polygon mainnet"],
        correctIndex: 1,
        explanation: "TOKO Coin is deployed on Sepolia testnet for educational and testing purposes.",
      },
    ],
  },
  {
    id: 8,
    title: "ERC20 Token Standard",
    text: "The ERC20 standard defines a common set of rules for fungible tokens on the Ethereum blockchain. Proposed in 2015 by Fabian Vogelsteller, ERC20 ensures interoperability between different tokens and applications. The standard requires six functions: totalSupply, balanceOf, transfer, transferFrom, approve, and allowance. It also defines two events: Transfer and Approval. Any wallet or exchange that supports ERC20 can automatically work with any ERC20 token. TOKO Coin is built on this standard. The standard uses 18 decimal places by default, though some tokens use fewer. ERC20 tokens represent assets like stablecoins (USDC), governance tokens (UNI), and utility tokens. The standard's success led to other standards like ERC721 for non-fungible tokens and ERC1155 for semi-fungible tokens.",
    questions: [
      {
        question: "What does ERC20 define?",
        options: ["A new programming language", "A common set of rules for fungible tokens on Ethereum", "A consensus mechanism", "A wallet type"],
        correctIndex: 1,
        explanation: "ERC20 is the technical standard for fungible tokens, ensuring interoperability across the ecosystem.",
      },
      {
        question: "Who proposed ERC20?",
        options: ["Vitalik Buterin", "Fabian Vogelsteller", "Satoshi Nakamoto", "Gavin Wood"],
        correctIndex: 1,
        explanation: "Fabian Vogelsteller proposed ERC20 in 2015, creating the foundation for token interoperability.",
      },
      {
        question: "How many decimal places does ERC20 use by default?",
        options: ["6", "8", "18", "24"],
        correctIndex: 2,
        explanation: "ERC20 uses 18 decimal places by default, though tokens can choose fewer.",
      },
      {
        question: "What ERC standard is used for non-fungible tokens?",
        options: ["ERC20", "ERC721", "ERC1155", "ERC777"],
        correctIndex: 1,
        explanation: "ERC721 is the standard for non-fungible tokens (NFTs), where each token is unique.",
      },
      {
        question: "Which tokens are examples of ERC20 tokens?",
        options: ["Bitcoin and Litecoin", "USDC, UNI, and TOKO", "Solana and Cardano", "Ethereum and Polygon"],
        correctIndex: 1,
        explanation: "USDC (stablecoin), UNI (governance), and TOKO (educational) are all ERC20 tokens on Ethereum.",
      },
    ],
  },
  {
    id: 9,
    title: "How Mining Works",
    text: "Cryptocurrency mining is the process of validating transactions and adding them to the blockchain. In Proof of Work systems like Bitcoin, miners use specialized hardware called ASICs to solve SHA-256 hash puzzles. The first miner to find a valid hash broadcasts the block to the network. If other miners verify it, the block is added to the chain and the miner receives a block reward and transaction fees. The mining difficulty adjusts every 2,016 blocks (roughly two weeks) to maintain a consistent 10-minute block time. Mining pools combine the computational power of many miners to increase their chances of earning rewards, which are then shared proportionally. With Ethereum's transition to Proof of Stake, mining on Ethereum is no longer possible — validators now stake ETH instead. Bitcoin mining has become highly industrialized, with large facilities in regions with cheap electricity.",
    questions: [
      {
        question: "What hardware do Bitcoin miners primarily use?",
        options: ["Regular laptops", "ASICs (Application-Specific Integrated Circuits)", "Smartphones", "Graphics cards"],
        correctIndex: 1,
        explanation: "Bitcoin mining uses ASICs — specialized hardware designed specifically for SHA-256 hashing.",
      },
      {
        question: "How often does Bitcoin's mining difficulty adjust?",
        options: ["Daily", "Every 2016 blocks (about 2 weeks)", "Yearly", "Every block"],
        correctIndex: 1,
        explanation: "Difficulty adjusts every 2,016 blocks to maintain a consistent 10-minute block time.",
      },
      {
        question: "What do mining pools do?",
        options: ["Store mined coins", "Combine many miners' power to share rewards proportionally", "Create new cryptocurrencies", "Replace miners"],
        correctIndex: 1,
        explanation: "Mining pools combine hashing power so participants earn more consistent rewards shared proportionally.",
      },
      {
        question: "Can you still mine Ethereum?",
        options: ["Yes, with any computer", "No, Ethereum switched to Proof of Stake", "Yes, but only with ASICs", "Yes, on the testnet"],
        correctIndex: 1,
        explanation: "Since The Merge in 2022, Ethereum uses Proof of Stake, replacing mining with staking.",
      },
      {
        question: "What determines if a mined block is accepted?",
        options: ["The miner's reputation", "Other nodes verify and agree the block is valid", "A central authority approves it", "The block creator decides"],
        correctIndex: 1,
        explanation: "Network nodes independently verify each block, and consensus determines block acceptance.",
      },
    ],
  },
  {
    id: 10,
    title: "Cryptographic Hashing",
    text: "Cryptographic hashing is a fundamental building block of blockchain technology. A hash function takes any input data and produces a fixed-size string of characters, called a hash. SHA-256, used by Bitcoin, always produces a 256-bit (32-byte) output regardless of input size. Hash functions have three critical properties: they are deterministic (same input always produces same output), preimage-resistant (you cannot reverse a hash to find the input), and collision-resistant (two different inputs should not produce the same hash). Even changing one character in the input completely changes the output — this is called the avalanche effect. Hashing secures blockchain data by linking blocks together: each block contains the hash of the previous block. Merkle trees use hashing to efficiently verify large data structures. Ethereum uses the Keccak-256 hash function, a variant of SHA-3.",
    questions: [
      {
        question: "What does SHA-256 always produce?",
        options: ["A 128-bit output", "A 256-bit (32-byte) output", "A variable-length output", "An encrypted message"],
        correctIndex: 1,
        explanation: "SHA-256 always produces a fixed 256-bit output regardless of the input size.",
      },
      {
        question: "What is preimage resistance?",
        options: ["You can easily reverse a hash", "You cannot reverse a hash to find the original input", "Hashes look like pictures", "Hashes can be predicted"],
        correctIndex: 1,
        explanation: "Preimage resistance means given a hash, it's computationally infeasible to find the original input.",
      },
      {
        question: "What does changing one character in the input do to the hash?",
        options: ["Changes it slightly", "Completely changes the output (avalanche effect)", "Has no effect", "Only sometimes changes it"],
        correctIndex: 1,
        explanation: "The avalanche effect means any small input change produces an entirely different output hash.",
      },
      {
        question: "How does hashing secure the blockchain?",
        options: ["By encrypting all data", "Each block contains the hash of the previous block, linking them together", "By requiring passwords", "Through email verification"],
        correctIndex: 1,
        explanation: "Each block contains the previous block's hash, creating an immutable chain that prevents tampering.",
      },
      {
        question: "Which hash function does Ethereum use?",
        options: ["SHA-256", "Keccak-256", "MD5", "SHA-512"],
        correctIndex: 1,
        explanation: "Ethereum uses Keccak-256, a variant of the SHA-3 standard, for its hashing operations.",
      },
    ],
  },
];

export const CLAIM_AMOUNT_PER_CORRECT = 1;
