import { useState } from "react";

const FAQ_DATA = [
  {
    q: "What is TOKO Coin?",
    a: "TOKO Coin is an ERC20 token deployed on the Sepolia testnet. It was created as a university blockchain project to demonstrate smart contract development, token transfers, and Web3 wallet integration.",
  },
  {
    q: "How do I get TOKO tokens?",
    a: "TOKO tokens were distributed as part of the initial supply. You can receive tokens from another holder by sending them to your wallet address.",
  },
  {
    q: "How do I connect my wallet?",
    a: "Click the \"Connect Wallet\" button in the top right corner. MetaMask will prompt you to connect. Make sure you're on the Sepolia testnet.",
  },
  {
    q: "Why do I need Sepolia test ETH?",
    a: "Sepolia test ETH is required to pay for gas fees when sending transactions. You can get free Sepolia ETH from any Sepolia faucet.",
  },
  {
    q: "What does 18 decimals mean?",
    a: "ERC20 tokens use 18 decimal places by default. This means 1 TOKO is represented as 1,000,000,000,000,000,000 (10^18) in the smart contract. Your wallet handles this automatically.",
  },
  {
    q: "Can I verify the contract on Etherscan?",
    a: "Yes! The contract address is publicly listed on Sepolia Etherscan. You can view all transactions, the source code, and holder information there.",
  },
];

function FAQItem({ q, a, open: defaultOpen }: { q: string; a: string; open?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="rounded-xl bg-slate-800/40 border border-cyber-800/30 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-cyber-100 hover:text-white transition-colors"
      >
        <span>{q}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-cyber-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-xs text-cyber-300/70 leading-6 font-light">
          {a}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <span className="font-mono text-xs font-medium text-cyber-400">FAQ</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {FAQ_DATA.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} open={i === 0} />
        ))}
      </div>
    </section>
  );
}
