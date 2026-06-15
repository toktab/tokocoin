import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { SEPOLIA_EXPLORER } from "../utils/constants";
import type { TxStatus } from "../hooks/useTokoContract";
import { useRecipientHistory } from "../hooks/useRecipientHistory";
import { formatAddress } from "../utils/format";
import { formatRelative } from "../hooks/useRelativeTime";
import { fireSideCannons } from "../utils/confetti";

type Props = {
  account: string;
  isTxPending: boolean;
  txStatus: TxStatus;
  onConnect: () => void;
  onSend: (recipient: string, amount: string, memo: string) => Promise<boolean>;
  reduceMotion: boolean;
  onSuccess: () => void;
  onError: () => void;
};

export function SendForm({
  account,
  isTxPending,
  txStatus,
  onConnect,
  onSend,
  reduceMotion,
  onSuccess,
  onError,
}: Props) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showRecipientList, setShowRecipientList] = useState(false);
  const lastTxRef = useRef<string>("");
  const lastSentRecipientRef = useRef<string>("");
  const recipientWrapperRef = useRef<HTMLDivElement>(null);
  const history = useRecipientHistory();

  const filteredEntries = useMemo(() => {
    const q = recipient.trim().toLowerCase();
    if (!q) return history.entries;
    return history.entries.filter((e) => e.address.toLowerCase().includes(q));
  }, [recipient, history.entries]);

  useEffect(() => {
    if (!showRecipientList) return;
    const handlePointer = (e: PointerEvent) => {
      if (recipientWrapperRef.current && !recipientWrapperRef.current.contains(e.target as Node)) {
        setShowRecipientList(false);
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [showRecipientList]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lastSentRecipientRef.current = recipient;
    const success = await onSend(recipient, amount, memo);
    if (success) {
      setRecipient("");
      setAmount("");
      setMemo("");
    }
  };

  useEffect(() => {
    if (txStatus.success === true && txStatus.txHash && txStatus.txHash !== lastTxRef.current) {
      lastTxRef.current = txStatus.txHash;
      if (lastSentRecipientRef.current) history.add(lastSentRecipientRef.current);
      onSuccess();
      if (!reduceMotion) fireSideCannons();
    } else if (txStatus.success === false && txStatus.message.startsWith("Transfer failed") && txStatus.message !== lastTxRef.current) {
      lastTxRef.current = txStatus.message;
      onError();
    }
  }, [txStatus, reduceMotion, onSuccess, onError, history]);

  return (
    <section id="send" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-cyber-800/40 px-3.5 py-2 mb-6">
          <span className="font-mono text-xs font-medium text-cyber-400">SEND TOKENS</span>
        </div>
        <h2 className="text-fluid-h2 font-display font-bold text-white mb-4">
          Send <span className="text-gradient">TOKO</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm text-cyber-200/60 font-light">
          Transfer TOKO tokens to any Ethereum address on Sepolia.
          A memo is stored locally for your reference.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {account ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div ref={recipientWrapperRef} className="relative">
              <label htmlFor="recipient-input" className="block text-xs font-semibold text-cyber-400 uppercase tracking-wider mb-2">
                Recipient Address
              </label>
              <div className="relative">
                <input
                  id="recipient-input"
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => { setRecipient(e.target.value); if (history.entries.length > 0) setShowRecipientList(true); }}
                  onFocus={() => { if (history.entries.length > 0) setShowRecipientList(true); }}
                  placeholder="0x..."
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full bg-slate-800/60 border border-cyber-800/40 rounded-xl px-4 py-3 pr-12 text-sm text-cyber-100 placeholder-cyber-700 focus:outline-none focus:border-cyber-500 focus:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowRecipientList((v) => !v)}
                  disabled={history.entries.length === 0}
                  className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    history.entries.length > 0 ? "text-cyber-400 hover:bg-slate-700 cursor-pointer" : "text-cyber-700 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {history.entries.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-cyber-600 text-white text-[9px] font-bold flex items-center justify-center">
                      {history.entries.length}
                    </span>
                  )}
                </button>
              </div>

              {showRecipientList && history.entries.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.25rem)] z-30 rounded-xl bg-slate-900 border border-cyber-800/50 shadow-[0_18px_38px_-12px_rgba(0,0,0,0.5)] overflow-hidden max-h-72 overflow-y-auto">
                  <div className="px-3 py-2 border-b border-cyber-800/30 flex items-center justify-between">
                    <p className="text-[10px] font-mono uppercase text-cyber-500 tracking-wide">Recent recipients</p>
                    <button
                      type="button"
                      onClick={() => { history.clear(); setShowRecipientList(false); }}
                      className="text-[10px] text-cyber-500 hover:text-cyber-300 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  {filteredEntries.length > 0 ? (
                    <ul>
                      {filteredEntries.map((entry) => (
                        <li key={entry.address} className="hover:bg-slate-800/50 transition-colors">
                          <button
                            type="button"
                            onClick={() => { setRecipient(entry.address); setShowRecipientList(false); }}
                            className="flex-1 min-w-0 w-full px-3 py-2.5 flex items-center gap-3 text-left"
                          >
                            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-cyber-800/30 flex items-center justify-center shrink-0">
                              <svg className="w-3.5 h-3.5 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-xs text-cyber-100 truncate" title={entry.address}>
                                {formatAddress(entry.address)}
                              </p>
                              <p className="text-[10px] text-cyber-500 font-light">{formatRelative(entry.lastUsed)}</p>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => history.remove(entry.address)}
                            className="shrink-0 w-10 h-10 flex items-center justify-center text-cyber-500 hover:text-cyber-300 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-center text-xs text-cyber-500">
                      No saved address matches <span className="font-mono text-cyber-300">{recipient}</span>.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="amount-input" className="block text-xs font-semibold text-cyber-400 uppercase tracking-wider mb-2">
                Amount (TOKO)
              </label>
              <input
                id="amount-input"
                type="number"
                required
                min="0.0001"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10"
                inputMode="decimal"
                autoComplete="off"
                className="w-full bg-slate-800/60 border border-cyber-800/40 rounded-xl px-4 py-3 text-sm text-cyber-100 placeholder-cyber-700 focus:outline-none focus:border-cyber-500 focus:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-all"
              />
            </div>

            <div>
              <label htmlFor="memo-input" className="block text-xs font-semibold text-cyber-400 uppercase tracking-wider mb-2">
                Note (local only)
              </label>
              <input
                id="memo-input"
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="e.g. Thanks for the coffee!"
                maxLength={140}
                className="w-full bg-slate-800/60 border border-cyber-800/40 rounded-xl px-4 py-3 text-sm text-cyber-100 placeholder-cyber-700 focus:outline-none focus:border-cyber-500 focus:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-all"
              />
              <p className="mt-2 text-[11px] italic text-cyber-500/60 leading-relaxed">
                Saved in your browser, tied to the transaction hash. The ERC20 standard only stores sender, recipient, and amount on-chain.
              </p>
            </div>

            <button
              type="submit"
              disabled={isTxPending}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-white bg-gradient-to-br from-cyber-600 to-purple-700 border border-cyber-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-70 ${
                isTxPending && !reduceMotion ? "animate-pulse" : ""
              }`}
            >
              {isTxPending ? "Awaiting confirmation..." : "Send TOKO"}
            </button>
          </form>
        ) : (
          <div className="bg-slate-800/60 border border-cyber-800/40 rounded-2xl p-8 text-center space-y-4">
            <p className="text-sm text-cyber-200/70">
              Connect your wallet to send TOKO tokens on Sepolia.
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

        {txStatus.message && (
          <div className={`mt-6 p-4 rounded-xl border ${
            txStatus.success === false
              ? "bg-red-900/30 border-red-800/40 text-red-200"
              : "bg-slate-800/60 border-cyber-800/40 text-cyber-100"
          }`}>
            <div className="flex items-start gap-3">
              <svg className={`w-5 h-5 mt-0.5 shrink-0 ${txStatus.success === false ? "text-red-400" : "text-cyber-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {txStatus.success === false ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <div className="flex-1 text-xs">
                <p className="font-semibold">{txStatus.message}</p>
                {txStatus.txHash && (
                  <a
                    href={`${SEPOLIA_EXPLORER}/tx/${txStatus.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline mt-1 block font-mono text-[10px] text-cyber-400 hover:text-cyber-300"
                  >
                    View on Etherscan
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
