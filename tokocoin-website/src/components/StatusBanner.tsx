type Props = {
  error: string | null;
  showNetworkWarning: boolean;
  onDismissError: () => void;
  onSwitchNetwork: () => void;
};

export function StatusBanner({ error, showNetworkWarning, onDismissError, onSwitchNetwork }: Props) {
  if (!error && !showNetworkWarning) return null;

  const isMetaMaskMissing = !!error && /metamask is not installed/i.test(error);

  return (
    <div className="fixed top-20 sm:top-24 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto space-y-2">
        {error && isMetaMaskMissing && (
          <div className="pointer-events-auto rounded-2xl bg-slate-900/90 border border-amber-800/50 text-cyber-100 px-4 py-3 shadow-[0_18px_38px_-22px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 mt-0.5 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-7.364A9 9 0 1112 3a9 9 0 017.364 4.636z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-5">Wallet not detected</p>
                <p className="mt-1 text-xs font-light leading-5 text-cyber-300">
                  Install MetaMask to connect your wallet.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="https://metamask.io/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 text-white text-xs font-semibold shadow-[0_0_12px_rgba(99,102,241,0.2)] active:scale-95 transition-transform min-h-[40px]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Get MetaMask
                  </a>
                  <button
                    type="button"
                    onClick={onDismissError}
                    className="inline-flex items-center gap-1 rounded-xl px-4 py-2.5 bg-slate-800 border border-cyber-800/50 text-cyber-300 text-xs font-semibold hover:bg-slate-700 transition-colors min-h-[40px]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={onDismissError}
                aria-label="Dismiss"
                className="shrink-0 text-cyber-500 hover:text-cyber-300 transition-colors -mr-1 -mt-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        {error && !isMetaMaskMissing && (
          <div className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-red-900/50 border border-red-800/50 text-red-200 px-4 py-3 shadow-[0_10px_28px_-18px_rgba(150,30,30,0.4)] backdrop-blur-xl">
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="flex-1 text-xs font-semibold leading-5">{error}</p>
            <button
              type="button"
              onClick={onDismissError}
              aria-label="Dismiss error"
              className="shrink-0 text-red-400 hover:text-red-200 transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {showNetworkWarning && (
          <div className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-amber-900/40 border border-amber-800/40 text-cyber-100 px-4 py-3 shadow-[0_10px_28px_-18px_rgba(180,120,40,0.3)] backdrop-blur-xl">
            <svg className="w-5 h-5 mt-0.5 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
            <div className="flex-1 text-xs leading-5">
              <p className="font-semibold">Wrong network</p>
              <p className="font-light text-cyber-300">Switch to Sepolia to interact with the TOKO contract.</p>
            </div>
            <button
              type="button"
              onClick={onSwitchNetwork}
              className="shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_10px_rgba(99,102,241,0.2)] hover:shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-all"
            >
              Switch to Sepolia
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
