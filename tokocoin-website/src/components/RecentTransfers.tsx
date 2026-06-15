import { Icon } from "@iconify/react";
import { CONTRACT_ADDRESS, SEPOLIA_EXPLORER, type Transfer } from "../utils/constants";
import { useRelativeTime } from "../hooks/useRelativeTime";

type Props = {
  transfers: Transfer[];
  onCopyContract: () => void;
};

function TransferRow({ tx }: { tx: Transfer }) {
  const time = useRelativeTime(tx.timestamp);
  return (
    <div className="rounded-xl bg-slate-800/40 border border-cyber-800/30 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono text-cyber-400 min-w-0 break-all">
          <span>From: {tx.from}</span>
          <span aria-hidden="true" className="text-cyber-600">→</span>
          <span>To: {tx.to}</span>
        </div>
        <span className="text-xs font-bold text-cyber-300 shrink-0">+{tx.amount} TOKO</span>
      </div>
      <p className="mt-2 text-xs text-cyber-300/70 italic font-light">"{tx.memo}"</p>
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-cyber-500 font-mono">
        <span>{time}</span>
        {tx.txHash && (
          <a
            href={`${SEPOLIA_EXPLORER}/tx/${tx.txHash}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-cyber-400 hover:text-cyber-300 underline decoration-dotted underline-offset-2"
            title="View on Etherscan"
          >
            <Icon icon="solar:square-arrow-right-up-linear" className="text-xs" />
            Etherscan
          </a>
        )}
      </div>
    </div>
  );
}

export function RecentTransfers({ transfers, onCopyContract }: Props) {
  return (
    <section id="transfers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-[1.85rem] bg-slate-900/60 border border-cyber-800/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
          <div className="px-5 py-4 border-b border-cyber-800/30 bg-slate-900/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-semibold text-cyber-100">Recent Transfers</span>
              </div>
              <span className="font-mono text-[10px] text-cyber-500">SEPOLIA LIVE</span>
            </div>
            <p className="mt-2 text-[11px] italic text-cyber-500/60 leading-relaxed">
              Memos shown below are local to your browser. Only addresses and amounts are on-chain.
            </p>
          </div>

          <div className="p-5 space-y-3 max-h-[400px] overflow-y-auto">
            {transfers.length === 0 ? (
              <p className="text-center text-xs text-cyber-500 py-8">No transfers yet.</p>
            ) : (
              transfers.map((tx) => <TransferRow key={tx.id} tx={tx} />)
            )}
          </div>

          <div className="p-4 bg-slate-900/80 border-t border-cyber-800/30 flex items-center justify-between gap-2 text-[11px] text-cyber-400 flex-wrap">
            <span className="break-all min-w-0">Contract: {CONTRACT_ADDRESS.substring(0, 8)}...</span>
            <button
              onClick={onCopyContract}
              className="underline font-semibold hover:text-cyber-300 active:text-cyber-200 min-h-[40px] py-1 px-1 -mx-1"
            >
              Copy Address
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
