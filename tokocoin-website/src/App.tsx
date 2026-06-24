import { useCallback, useEffect } from "react";
import { useWallet } from "./hooks/useWallet";
import { useTokoContract } from "./hooks/useTokoContract";
import { useFaucetClaim } from "./hooks/useFaucetClaim";
import { useSettings } from "./hooks/useSettings";
import { useTotalSupply } from "./hooks/useTotalSupply";
import { CONTRACT_ADDRESS } from "./utils/constants";
import { ParticleBackground } from "./components/ParticleBackground";
import { Header } from "./components/Header";
import { StatusBanner } from "./components/StatusBanner";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ReceivePanel } from "./components/ReceivePanel";
import { SendForm } from "./components/SendForm";
import { RecentTransfers } from "./components/RecentTransfers";
import { Technical } from "./components/Technical";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { LearnEarn } from "./components/LearnEarn";

function App() {
  const wallet = useWallet();
  const toko = useTokoContract(wallet.provider, wallet.account, wallet.ensureSepolia);
  const faucet = useFaucetClaim(wallet.provider, wallet.account, wallet.ensureSepolia);
  const settings = useSettings();
  const supply = useTotalSupply();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("toko-motion-reduced", settings.reduceMotion);
  }, [settings.reduceMotion]);

  const handleCopyContract = useCallback(() => {
    void navigator.clipboard.writeText(CONTRACT_ADDRESS);
    alert("Contract address copied to clipboard!");
  }, []);

  const handleSendSuccess = useCallback(() => {
    /* confetti handled in SendForm */
  }, []);

  const handleSendError = useCallback(() => {
    /* error state handled in SendForm */
  }, []);

  return (
    <>
      <ParticleBackground />
      <Header
        account={wallet.account}
        isConnecting={wallet.isConnecting}
        isCorrectNetwork={wallet.isCorrectNetwork}
        onConnect={wallet.connect}
        onDisconnect={wallet.disconnect}
      />
      <StatusBanner
        error={wallet.error}
        showNetworkWarning={!!wallet.account && !wallet.isCorrectNetwork}
        onDismissError={wallet.clearError}
        onSwitchNetwork={() => { void wallet.ensureSepolia(); }}
      />
      <main className="relative z-10">
        <Hero
          account={wallet.account}
          balance={toko.balance}
          isLoadingBalance={toko.isLoadingBalance}
          balanceError={toko.balanceError}
          totalSupply={supply.totalSupply}
          totalSupplyDecimals={supply.decimals}
          holderCount={0}
          reduceMotion={settings.reduceMotion}
          onConnect={wallet.connect}
        />
        <About />
        <ReceivePanel account={wallet.account} onConnect={wallet.connect} />
        <SendForm
          account={wallet.account}
          isTxPending={toko.isTxPending}
          txStatus={toko.txStatus}
          onConnect={wallet.connect}
          onSend={toko.sendToko}
          reduceMotion={settings.reduceMotion}
          onSuccess={handleSendSuccess}
          onError={handleSendError}
        />
        <RecentTransfers
          transfers={toko.recentTransfers}
          onCopyContract={handleCopyContract}
        />
        <LearnEarn
          account={wallet.account}
          onConnect={wallet.connect}
          claimReward={faucet.claim}
          claimTxStatus={faucet.txStatus}
          resetClaimStatus={faucet.reset}
        />
        <Technical onCopyContract={handleCopyContract} />
        <FAQ />
        <FinalCTA account={wallet.account} onConnect={wallet.connect} />
      </main>
      <Footer onCopyContract={handleCopyContract} />
    </>
  );
}

export default App;
