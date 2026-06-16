import { useCallback, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { FAUCET_ABI, FAUCET_ADDRESS } from "../utils/constants";
import { friendlyError } from "../utils/errors";

export type FaucetTxStatus = {
  success: boolean | null;
  message: string;
  txHash: string;
};

export type FaucetClaimState = {
  txStatus: FaucetTxStatus;
  isClaimPending: boolean;
  claim: (score: number, articleId: number) => Promise<{ ok: boolean; txHash?: string }>;
  reset: () => void;
};

const EMPTY: FaucetTxStatus = { success: null, message: "", txHash: "" };

export function useFaucetClaim(
  walletProvider: BrowserProvider | null,
  account: string,
  ensureSepolia: () => Promise<void>,
): FaucetClaimState {
  const [txStatus, setTxStatus] = useState<FaucetTxStatus>(EMPTY);
  const [isClaimPending, setIsClaimPending] = useState(false);

  const reset = useCallback(() => setTxStatus(EMPTY), []);

  const claim = useCallback(
    async (score: number, articleId: number): Promise<{ ok: boolean; txHash?: string }> => {
      if (!FAUCET_ADDRESS) {
        setTxStatus({ success: false, message: "Faucet not configured. Deploy TokoFaucet and set VITE_FAUCET_ADDRESS.", txHash: "" });
        return { ok: false };
      }
      if (!account) {
        setTxStatus({ success: false, message: "Please connect your wallet first.", txHash: "" });
        return { ok: false };
      }
      if (!Number.isInteger(score) || score < 1 || score > 5) {
        setTxStatus({ success: false, message: "Invalid score.", txHash: "" });
        return { ok: false };
      }
      if (!window.ethereum || !walletProvider) {
        setTxStatus({ success: false, message: "MetaMask is not connected.", txHash: "" });
        return { ok: false };
      }

      try {
        setIsClaimPending(true);
        setTxStatus({ success: null, message: "Awaiting approval in MetaMask...", txHash: "" });

        await ensureSepolia();

        const localProvider = new BrowserProvider(window.ethereum);
        const signer = await localProvider.getSigner();
        const contract = new Contract(FAUCET_ADDRESS, FAUCET_ABI, signer);

        const tx = await contract.claimReward(score, articleId);

        setTxStatus({ success: null, message: "Claim pending on-chain...", txHash: tx.hash });

        await tx.wait();

        setTxStatus({ success: true, message: `Claimed ${score} TOKO!`, txHash: tx.hash });
        return { ok: true, txHash: tx.hash };
      } catch (err) {
        setTxStatus({ success: false, message: `Claim failed: ${friendlyError(err)}`, txHash: "" });
        return { ok: false };
      } finally {
        setIsClaimPending(false);
      }
    },
    [account, walletProvider, ensureSepolia],
  );

  return { txStatus, isClaimPending, claim, reset };
}
