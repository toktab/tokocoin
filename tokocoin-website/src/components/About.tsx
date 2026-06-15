export function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <span className="font-mono text-xs font-medium text-cyber-400">ABOUT</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          What is <span className="text-gradient">TOKO</span>?
        </h2>
        <p className="max-w-2xl mx-auto text-base text-cyber-200/70 font-light leading-7">
          TOKO Coin is an ERC20 token deployed on the Ethereum Sepolia testnet. 
          Built as a university blockchain project, it demonstrates smart contract 
          development, wallet interactions, and decentralized token transfers — all 
          on a real test network.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Secure ERC20",
            desc: "Standard ERC20 interface — balanceOf, transfer, and events. Fully compatible with MetaMask and Etherscan.",
            color: "from-cyber-600/20 to-cyber-700/10",
            border: "border-cyber-600/30",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            title: "Fast Transactions",
            desc: "Deployed on Sepolia with ~12 second block times. Send tokens to any address and see results in seconds.",
            color: "from-purple-600/20 to-purple-700/10",
            border: "border-purple-600/30",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            ),
            title: "Open Source",
            desc: "Fully transparent smart contract. View the source code and transactions on Sepolia Etherscan.",
            color: "from-cyan-600/20 to-cyan-700/10",
            border: "border-cyan-600/30",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} p-6 sm:p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:translate-y-[-4px] transition-all duration-500`}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-cyber-800/40 flex items-center justify-center text-cyber-400 mb-4">
              {card.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-cyber-200/60 font-light leading-6">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
