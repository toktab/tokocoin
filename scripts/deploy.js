const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const TokoCoin = await hre.ethers.getContractFactory("TokoCoin");
  const tokoCoin = await TokoCoin.deploy(deployer.address);

  await tokoCoin.waitForDeployment();

  const tokenAddress = await tokoCoin.getAddress();
  console.log("TokoCoin deployed to:", tokenAddress);

  // Check the balance of the deployer (funding wallet)
  const balance = await tokoCoin.balanceOf(deployer.address);
  console.log("Funding wallet balance:", hre.ethers.formatUnits(balance, 18), "TOKO");
  console.log("Total supply:", hre.ethers.formatUnits(await tokoCoin.totalSupply(), 18), "TOKO");

  // Deploy TokoFaucet
  const TokoFaucet = await hre.ethers.getContractFactory("TokoFaucet");
  const faucet = await TokoFaucet.deploy(tokenAddress);
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();
  console.log("TokoFaucet deployed to:", faucetAddress);

  // Fund the faucet with 10 TOKO (out of 14 total)
  const fundTx = await tokoCoin.transfer(faucetAddress, hre.ethers.parseUnits("10", 18));
  await fundTx.wait();
  console.log("Faucet funded with 10 TOKO");

  // Print the faucet address for the .env file
  console.log("\nAdd this to your tokocoin-website/.env file:");
  console.log(`VITE_FAUCET_ADDRESS=${faucetAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
