import { formatAddress } from "../utils/format";
import { AnimatedNumber } from "./AnimatedNumber";
import { formatUnits } from "ethers";

type Props = {
  account: string;
  balance: string;
  isLoadingBalance: boolean;
  balanceError: string | null;
  totalSupply: bigint | null;
  totalSupplyDecimals: bigint | null;
  holderCount: number;
  reduceMotion: boolean;
  onConnect: () => void;
};

export function Hero({
  account,
  balance,
  isLoadingBalance,
  balanceError,
  totalSupply,
  totalSupplyDecimals,
  holderCount,
  reduceMotion,
  onConnect,
}: Props) {
  const numericBalance = Number(balance);
  const showBalanceSkeleton = Boolean(account) && isLoadingBalance;
  const totalSupplyNumber = totalSupply && totalSupplyDecimals
    ? Number(formatUnits(totalSupply, totalSupplyDecimals))
    : 50000;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-20 overflow-hidden">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-12 lg:gap-16 items-center min-w-0">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] mb-6 sm:mb-8">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="font-mono text-xs font-medium tracking-tight text-cyber-400">ERC20 · SEPOLIA</span>
          </div>

          <h1 className="text-fluid-display font-display font-black tracking-tight text-white"
            style={{ textShadow: "0 0 30px rgba(99,102,241,0.3), 0 1px 2px rgba(0,0,0,0.8)" }}>
            <span className="block">TOKO</span>
            <span className="block mt-1.5 sm:mt-2 text-gradient">COIN</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base md:text-lg leading-7 sm:leading-8 text-cyber-200/80 font-light max-w-2xl mx-auto lg:mx-0">
            A next-generation ERC20 token on Ethereum Sepolia. Built for learning,
            sending, and exploring decentralized finance.
          </p>

          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            {!account ? (
              <button
                type="button"
                onClick={onConnect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 text-white text-sm font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect Wallet
              </button>
            ) : (
              <a
                href="#send"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 text-white text-sm font-semibold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send TOKO
              </a>
            )}
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 bg-slate-800/80 border border-cyber-800/40 text-cyber-200 text-sm font-semibold hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-cyber-400/70 font-light">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              Sepolia Testnet
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-cyber-700" />
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-cyber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Contract Verified
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-cyber-700" />
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-cyber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              University Project
            </span>
          </div>
        </div>

        <div className="relative lg:pl-4 min-w-0 hidden lg:block">
          <div className="absolute -inset-4 sm:-inset-8 rounded-[3rem] bg-gradient-to-br from-cyber-600/10 via-transparent to-purple-700/10 blur-3xl pointer-events-none" />

          <div className="relative rounded-[2rem] bg-slate-900/60 border border-cyber-800/40 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] p-4 sm:p-5">
            <div className="rounded-[1.5rem] bg-slate-900/80 border border-cyber-800/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between border-b border-cyber-800/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-500 shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                </div>
                <div className="font-mono text-[10px] text-cyber-500 tracking-wide font-semibold">TOKEN OVERVIEW</div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-cyber-400/70 font-light mb-1">Total Supply</p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white tabular-nums">
                      <AnimatedNumber value={totalSupplyNumber} decimals={0} suffix=" TOKO" enabled={!reduceMotion} />
                    </h2>
                    {holderCount > 0 && (
                      <p className="mt-1 text-[10px] text-cyber-500 font-mono">
                        <AnimatedNumber value={holderCount} enabled={!reduceMotion} /> holders on chain
                      </p>
                    )}
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyber-600/30 to-purple-700/30 border border-cyber-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                    <svg className="w-6 h-6 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl bg-slate-800/60 border border-cyber-800/30 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-cyber-600/20 border border-cyber-500/30 flex items-center justify-center">
                        <svg className="w-4 h-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-cyber-100">Your Wallet</p>
                          <span className="text-[10px] text-cyber-500 bg-cyber-900/50 border border-cyber-800/40 rounded-full px-2 py-0.5">Sepolia</span>
                        </div>
                        <p className="text-xs leading-5 text-cyber-400/60 mt-1 font-light">
                          {account ? `Connected: ${formatAddress(account)}` : "Connect to view balance"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-cyber-900/50 text-white border border-cyber-800/30 p-4 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <div className="relative flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]" />
                            <p className="text-[10px] text-cyber-400/70 font-light">Your Balance</p>
                          </div>
                          <p className="mt-2 text-xl font-bold tracking-tight text-white tabular-nums">
                            {showBalanceSkeleton ? (
                              <span className="text-cyber-400 animate-pulse">Loading...</span>
                            ) : (
                              <AnimatedNumber value={numericBalance} decimals={2} suffix=" TOKO" enabled={!reduceMotion} />
                            )}
                          </p>
                          {balanceError && <p className="mt-1 text-[10px] text-red-400 font-medium">{balanceError}</p>}
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-slate-700/50 border border-cyber-800/30 flex items-center justify-center">
                          <svg className="w-4 h-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-cyber-700/50 to-purple-800/30 text-white border border-cyber-600/30 p-4 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <p className="text-[10px] text-cyber-300/70 font-light">Contract Status</p>
                      <p className="mt-1 text-xs leading-5 font-light text-cyber-200/80">
                        Verified on Sepolia. 18 decimals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
