import { useCallback, useEffect, useRef, useState } from "react";
import { formatUnits } from "ethers";
import { useReadOnlyContract } from "./useReadOnlyContract";
import { TOTAL_SUPPLY_POLL_MS } from "../utils/constants";

export function useTotalSupply() {
  const { contract } = useReadOnlyContract();
  const [totalSupply, setTotalSupply] = useState<bigint | null>(null);
  const [decimals, setDecimals] = useState<bigint | null>(null);
  const mountedRef = useRef(true);

  const fetch = useCallback(async () => {
    try {
      const [supply, d] = await Promise.all([
        contract.totalSupply() as Promise<bigint>,
        contract.decimals() as Promise<bigint>,
      ]);
      if (mountedRef.current) {
        setTotalSupply(supply);
        setDecimals(d);
      }
    } catch { /* ignore */ }
  }, [contract]);

  useEffect(() => {
    mountedRef.current = true;
    void fetch();
    const interval = setInterval(fetch, TOTAL_SUPPLY_POLL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [fetch]);

  const formatted = totalSupply && decimals
    ? Number(formatUnits(totalSupply, decimals))
    : 50000;

  return { totalSupply, decimals, formatted };
}
