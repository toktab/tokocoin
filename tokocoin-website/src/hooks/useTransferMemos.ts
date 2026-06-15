import { useCallback } from "react";

const MEMO_KEY_PREFIX = "toko-memo-";

export function useTransferMemos() {
  const getMemo = useCallback((txHash: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const key = MEMO_KEY_PREFIX + txHash;
      const memo = window.localStorage.getItem(key);
      return memo && memo.trim() ? memo : null;
    } catch {
      return null;
    }
  }, []);

  const saveMemo = useCallback((txHash: string, memo: string): void => {
    if (typeof window === "undefined") return;
    if (!memo || !memo.trim()) return;
    try {
      const key = MEMO_KEY_PREFIX + txHash;
      window.localStorage.setItem(key, memo);
    } catch {
      // ignore quota
    }
  }, []);

  return { getMemo, saveMemo };
}
