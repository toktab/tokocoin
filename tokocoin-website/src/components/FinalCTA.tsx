type Props = {
  account: string;
  onConnect: () => void;
};

export function FinalCTA({ account, onConnect }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="relative rounded-[2rem] bg-gradient-to-br from-cyber-700/30 via-slate-900 to-purple-800/20 border border-cyber-600/30 overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 px-8 sm:px-16 py-12 sm:py-20 text-center">
          <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
            Ready to <span className="text-gradient">Explore</span>?
          </h2>
          <p className="max-w-lg mx-auto text-sm text-cyber-200/60 font-light leading-6 mb-8">
            Connect your wallet to check your balance, send TOKO tokens,
            and explore the world of decentralized finance on Sepolia.
          </p>
          {!account ? (
            <button
              type="button"
              onClick={onConnect}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:shadow-[0_0_36px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect Wallet
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#receive"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-cyber-200 bg-slate-800/80 border border-cyber-800/40 hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Receive TOKO
              </a>
              <a
                href="#send"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:shadow-[0_0_36px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send TOKO
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
