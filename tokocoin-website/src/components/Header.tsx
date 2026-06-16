import { useEffect, useRef, useState } from "react";
import { formatAddress } from "../utils/format";

type Props = {
  account: string;
  isConnecting: boolean;
  isCorrectNetwork: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#receive", label: "Receive" },
  { href: "#send", label: "Send" },
  { href: "#transfers", label: "Transfers" },
  { href: "#learn-earn", label: "Learn" },
  { href: "#contract", label: "Contract" },
  { href: "#faq", label: "FAQ" },
];

export function Header({ account, isConnecting, isCorrectNetwork, onConnect, onDisconnect }: Props) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const showNetworkWarn = !!account && !isCorrectNetwork;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5">
        <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyber-800/50 shadow-[0_14px_38px_-22px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
              <span className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                <span className="font-display text-xs font-bold text-white tracking-tight">T</span>
              </span>
              <span className="hidden xs:flex flex-col justify-center leading-none min-w-0">
                <span className="font-display text-sm font-bold tracking-wide text-white group-hover:text-cyber-300 transition-colors truncate">
                  TOKO COIN
                </span>
                <span className="hidden sm:block mt-0.5 text-[10px] font-light text-cyber-400/70 truncate">
                  ERC20 on Sepolia
                </span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-5 lg:gap-7 text-xs text-cyber-300 font-medium">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative transition-colors duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-cyber-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="md:hidden relative" ref={mobileRef}>
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? "Close" : "Menu"}
                  className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-cyber-800/50 flex items-center justify-center text-cyber-300 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {mobileOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                {mobileOpen && (
                  <div className="fixed top-[3.75rem] sm:top-[4.5rem] right-3 w-[min(15rem,calc(100vw-1.5rem))] rounded-2xl bg-slate-900 border border-cyber-800/50 shadow-[0_18px_38px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-[60]">
                    <div className="px-4 py-2 border-b border-cyber-800/30">
                      <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide">Jump to</p>
                    </div>
                    <ul>
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 text-sm text-cyber-200 hover:bg-cyber-900/50 transition-colors min-h-[44px] flex items-center"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {account ? (
                <div className="relative" ref={popoverRef}>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className={`flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 border border-cyber-800/50 rounded-xl px-3.5 py-2 transition-all ${
                      !showNetworkWarn ? "shadow-[0_0_12px_rgba(99,102,241,0.15)]" : ""
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      showNetworkWarn ? "bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]" : "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]"
                    }`} />
                    <span className="font-mono text-xs font-semibold text-cyber-100">{formatAddress(account)}</span>
                    <svg className={`w-3.5 h-3.5 text-cyber-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {open && (
                    <div className="absolute top-full mt-2 right-0 w-[min(16rem,calc(100vw-1.5rem))] rounded-2xl bg-slate-900 border border-cyber-800/50 shadow-[0_18px_38px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-[60]">
                      <div className="px-4 py-3 border-b border-cyber-800/30">
                        <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide">Connected</p>
                        <p className="mt-1 font-mono text-xs font-semibold text-cyber-100 break-all">{account}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                          <span className={`w-1.5 h-1.5 rounded-full ${showNetworkWarn ? "bg-amber-500" : "bg-emerald-500"}`} />
                          <span className={showNetworkWarn ? "text-amber-400 font-semibold" : "text-emerald-400 font-semibold"}>
                            {showNetworkWarn ? "Wrong network" : "Sepolia"}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { onDisconnect(); setOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-xs text-cyber-300 hover:bg-cyber-900/50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Disconnect Wallet
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onConnect}
                  disabled={isConnecting}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 shrink-0"
                >
                  <svg className="w-4 h-4 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                  <span className="sm:hidden">{isConnecting ? "..." : "Connect"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
