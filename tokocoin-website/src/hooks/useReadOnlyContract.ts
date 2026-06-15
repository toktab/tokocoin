import { useMemo } from "react";
import { Contract, FallbackProvider, JsonRpcProvider } from "ethers";
import { CONTRACT_ADDRESS, TOKO_ABI, SEPOLIA_RPCS } from "../utils/constants";

export function useReadOnlyContract() {
  const provider = useMemo(() => {
    const providers = SEPOLIA_RPCS.map(
      (url, _i) => new JsonRpcProvider(url, 11155111, { staticNetwork: true }),
    );
    if (providers.length === 1) {
      return providers[0];
    }
    return new FallbackProvider(providers);
  }, []);

  const contract = useMemo(() => {
    return new Contract(CONTRACT_ADDRESS, TOKO_ABI, provider);
  }, [provider]);

  return { contract, provider };
}
