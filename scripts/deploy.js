const hre = require("hardhat");

async function main() {
  const [deployer, fundingWallet] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Funding wallet address:", fundingWallet.address);

  const TokoCoin = await hre.ethers.getContractFactory("TokoCoin");
  const tokoCoin = await TokoCoin.deploy(fundingWallet.address);

  await tokoCoin.waitForDeployment();

  const tokenAddress = await tokoCoin.getAddress();
  console.log("TokoCoin deployed to:", tokenAddress);

  // Check the balance of the funding wallet
  const balance = await tokoCoin.balanceOf(fundingWallet.address);
  console.log("Funding wallet balance:", hre.ethers.formatUnits(balance, 18), "TOKO");
  console.log("Total supply:", hre.ethers.formatUnits(await tokoCoin.totalSupply(), 18), "TOKO");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
