import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "toko-recipients-v1";

export type RecipientEntry = {
  address: string;
  lastUsed: number;
};

function loadEntries(): RecipientEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecipientEntry[];
  } catch { return []; }
}

function saveEntries(entries: RecipientEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch { /* ignore */ }
}

const MAX_ENTRIES = 20;

export function useRecipientHistory() {
  const [entries, setEntries] = useState<RecipientEntry[]>(loadEntries);

  useEffect(() => { saveEntries(entries); }, [entries]);

  const add = useCallback((address: string) => {
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.address !== address);
      return [{ address, lastUsed: Date.now() }, ...filtered].slice(0, MAX_ENTRIES);
    });
  }, []);

  const remove = useCallback((address: string) => {
    setEntries((prev) => prev.filter((e) => e.address !== address));
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  return { entries, add, remove, clear };
}
