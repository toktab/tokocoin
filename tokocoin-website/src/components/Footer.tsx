import { CONTRACT_ADDRESS, SEPOLIA_EXPLORER } from "../utils/constants";

type Props = {
  onCopyContract: () => void;
};

export function Footer({ onCopyContract }: Props) {
  return (
    <footer className="relative z-10 w-full bg-slate-900/80 border-t border-cyber-800/30 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-10 lg:gap-16">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                <span className="font-display text-xs font-bold text-white">T</span>
              </span>
              <span className="flex flex-col justify-center leading-none">
                <span className="font-display text-sm font-bold tracking-wide text-white">TOKO COIN</span>
                <span className="mt-1 text-[10px] font-light text-cyber-400/70">ERC20 on Sepolia</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-cyber-300/50 font-light">
              A university blockchain project demonstrating ERC20 token deployment,
              wallet integration, and decentralized transfers on Sepolia.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-800/60 border border-cyber-800/30 px-3 py-1.5 text-xs text-cyber-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
              Sepolia · Open source
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <p className="font-mono text-[10px] font-semibold text-cyber-500 uppercase mb-4">Contract</p>
              <div className="flex flex-col gap-2 text-sm text-cyber-300/60 font-light">
                <button
                  onClick={onCopyContract}
                  className="hover:text-cyber-300 text-left py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 inline-flex items-center justify-center sm:justify-start"
                >
                  Copy Address
                </button>
                <a
                  href={`${SEPOLIA_EXPLORER}/address/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyber-300 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 inline-flex items-center justify-center sm:justify-start"
                >
                  Sepolia Explorer
                </a>
                <span className="text-xs font-mono text-cyber-500 bg-slate-800/60 border border-cyber-800/30 px-2 py-1 rounded w-fit self-center sm:self-auto mt-2">
                  {CONTRACT_ADDRESS.substring(0, 8)}...{CONTRACT_ADDRESS.substring(38)}
                </span>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] font-semibold text-cyber-500 uppercase mb-4">Sections</p>
              <div className="flex flex-col gap-2 text-sm text-cyber-300/60 font-light">
                <a href="#about" className="hover:text-cyber-300 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 inline-flex items-center justify-center sm:justify-start">
                  About
                </a>
                <a href="#send" className="hover:text-cyber-300 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 inline-flex items-center justify-center sm:justify-start">
                  Send TOKO
                </a>
                <a href="#contract" className="hover:text-cyber-300 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 inline-flex items-center justify-center sm:justify-start">
                  Contract
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] font-semibold text-cyber-500 uppercase mb-4">Info</p>
              <div className="flex flex-col gap-2 text-sm text-cyber-300/60 font-light">
                <span className="py-2 sm:py-1.5 inline-flex items-center justify-center sm:justify-start">
                  Built with React + ethers v6
                </span>
                <span className="text-xs text-cyber-400 bg-cyber-900/30 border border-cyber-800/30 px-2.5 py-1 rounded w-fit self-center sm:self-auto shadow-sm mt-2">
                  University Blockchain Project
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cyber-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cyber-500/50 font-light">
            &copy; 2026 TOKO COIN. University Blockchain Project on Sepolia testnet.
          </p>
        </div>
      </div>
    </footer>
  );
}
