import { useCallback, useState } from "react";

type Props = {
  account: string;
  onConnect: () => void;
};

function AddressQR({ address }: { address: string }) {
  const size = 140;
  const cells = 8;
  const cellSize = size / cells;
  const seed = address.toLowerCase().split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const matrix: boolean[][] = Array.from({ length: cells }, (_, y) =>
    Array.from({ length: cells }, (_, x) => {
      if ((x === 0 || x === cells - 1) && (y === 0 || y === cells - 1)) return true;
      if (x === 0 || x === cells - 1 || y === 0 || y === cells - 1) return true;
      const val = ((seed * (x + 1) * (y + 3) * 7 + seed * 13) % 100) > 45;
      return val;
    }),
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} rx={12} fill="#1E293B" />
      {matrix.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize + 1}
              y={y * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              rx={2}
              fill={x < 3 && y < 3 ? "#818CF8" : x >= cells - 3 && y < 3 ? "#818CF8" : x < 3 && y >= cells - 3 ? "#818CF8" : "#6366F1"}
              opacity={x < 2 || x > cells - 3 || y < 2 || y > cells - 3 ? 0.9 : 0.7}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

export function ReceivePanel({ account, onConnect }: Props) {
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!account) return;
    void navigator.clipboard.writeText(account);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  }, [account]);

  return (
    <section id="receive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <span className="font-mono text-xs font-medium text-cyber-400">RECEIVE</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          Receive <span className="text-gradient">TOKO</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm text-cyber-200/60 font-light">
          Share your wallet address to receive TOKO tokens from anyone on Sepolia.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {account ? (
          <div className="rounded-2xl bg-slate-900/60 border border-cyber-800/40 p-6 sm:p-8 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex flex-col items-center gap-6">
              <div className="p-2 bg-slate-800/80 border border-cyber-800/30 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <AddressQR address={account} />
              </div>

              <div className="w-full">
                <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide mb-2 text-center">
                  Your Wallet Address
                </p>
                <div className="flex items-center gap-2 bg-slate-800/60 border border-cyber-800/30 rounded-xl px-4 py-3">
                  <code className="flex-1 text-xs font-mono text-cyber-200 break-all select-all leading-6">
                    {account}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      justCopied
                        ? "bg-emerald-600/30 border border-emerald-500/50 text-emerald-400"
                        : "bg-cyber-600/20 border border-cyber-500/30 text-cyber-400 hover:bg-cyber-600/30"
                    }`}
                    title={justCopied ? "Copied!" : "Copy address"}
                  >
                    {justCopied ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                {justCopied && (
                  <p className="mt-2 text-xs text-emerald-400 text-center font-medium animate-pulse">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              <div className="w-full rounded-xl bg-slate-800/40 border border-cyber-800/30 p-4">
                <p className="text-xs font-semibold text-cyber-300 mb-2">How to receive TOKO:</p>
                <ol className="text-xs text-cyber-400/70 font-light space-y-1.5 list-decimal list-inside">
                  <li>Copy your wallet address above</li>
                  <li>Share it with the person sending you TOKO</li>
                  <li>They send TOKO from their wallet to this address</li>
                  <li>Watch your balance update after the transaction confirms</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/60 border border-cyber-800/40 rounded-2xl p-8 text-center space-y-4">
            <p className="text-sm text-cyber-200/70">
              Connect your wallet to see your receive address.
            </p>
            <button
              type="button"
              onClick={onConnect}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect MetaMask
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
