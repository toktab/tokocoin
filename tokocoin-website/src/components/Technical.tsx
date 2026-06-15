import { CONTRACT_ADDRESS, SEPOLIA_EXPLORER } from "../utils/constants";

type Props = {
  onCopyContract: () => void;
};

export function Technical({ onCopyContract }: Props) {
  return (
    <section id="contract" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <span className="font-mono text-xs font-medium text-cyber-400">CONTRACT</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          Smart <span className="text-gradient">Contract</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm text-cyber-200/60 font-light">
          Deployed on Sepolia testnet. Fully verifiable on Etherscan.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl bg-slate-900/60 border border-cyber-800/40 p-6 sm:p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide mb-1.5">Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs font-mono text-cyber-200 bg-slate-800/60 border border-cyber-800/30 rounded-lg px-3 py-2.5 break-all">
                  {CONTRACT_ADDRESS}
                </code>
                <button
                  type="button"
                  onClick={onCopyContract}
                  className="shrink-0 w-10 h-10 rounded-lg bg-cyber-600/20 border border-cyber-500/30 flex items-center justify-center text-cyber-400 hover:bg-cyber-600/30 transition-colors"
                  title="Copy address"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800/60 border border-cyber-800/30 p-4">
                <p className="text-[10px] font-mono text-cyber-500/70 mb-1">Network</p>
                <p className="text-sm font-semibold text-cyber-100">Sepolia</p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-cyber-800/30 p-4">
                <p className="text-[10px] font-mono text-cyber-500/70 mb-1">Chain ID</p>
                <p className="text-sm font-semibold text-cyber-100 font-mono">11155111</p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-cyber-800/30 p-4">
                <p className="text-[10px] font-mono text-cyber-500/70 mb-1">Standard</p>
                <p className="text-sm font-semibold text-cyber-100">ERC20</p>
              </div>
              <div className="rounded-xl bg-slate-800/60 border border-cyber-800/30 p-4">
                <p className="text-[10px] font-mono text-cyber-500/70 mb-1">Decimals</p>
                <p className="text-sm font-semibold text-cyber-100">18</p>
              </div>
            </div>

            <a
              href={`${SEPOLIA_EXPLORER}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Etherscan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
