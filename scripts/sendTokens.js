const hre = require("hardhat");

async function main() {
  const [sender] = await hre.ethers.getSigners();
  
  // Your deployed token contract address
  const tokenAddress = "0x740fCC18f4B013C4bcD5c850f79Cdd4FB6399eb5";
  
  // Instructor's address
  const instructorAddress = "0xE16c9d8B67765818Da9d83a1c5Eb6478E51f9e8C";
  
  // Amount to send (10 tokens with 18 decimals)
  const amount = hre.ethers.parseUnits("10", 18);
  
  console.log("Sender address:", sender.address);
  console.log("Token contract:", tokenAddress);
  console.log("Sending to instructor:", instructorAddress);
  console.log("Amount:", "10 TOKO");
  
  // Get the token contract
  const TokoCoin = await hre.ethers.getContractFactory("TokoCoin");
  const tokoCoin = TokoCoin.attach(tokenAddress);
  
  // Check balance before
  const balanceBefore = await tokoCoin.balanceOf(sender.address);
  console.log("\nYour balance before:", hre.ethers.formatUnits(balanceBefore, 18), "TOKO");
  
  // Send tokens
  console.log("\nSending tokens...");
  const tx = await tokoCoin.transfer(instructorAddress, amount);
  console.log("Transaction hash:", tx.hash);
  
  // Wait for confirmation
  await tx.wait();
  console.log("Transaction confirmed!");
  
  // Check balances after
  const balanceAfter = await tokoCoin.balanceOf(sender.address);
  const instructorBalance = await tokoCoin.balanceOf(instructorAddress);
  
  console.log("\nYour balance after:", hre.ethers.formatUnits(balanceAfter, 18), "TOKO");
  console.log("Instructor balance:", hre.ethers.formatUnits(instructorBalance, 18), "TOKO");
  console.log("\n✅ Successfully sent 10 TOKO to instructor!");
  console.log("View transaction on Etherscan:");
  console.log("https://sepolia.etherscan.io/tx/" + tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
