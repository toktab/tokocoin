const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokoCoin", function () {
  let tokoCoin;
  let owner;
  let fundingWallet;
  let addr1;

  beforeEach(async function () {
    [owner, fundingWallet, addr1] = await ethers.getSigners();
    
    const TokoCoin = await ethers.getContractFactory("TokoCoin");
    tokoCoin = await TokoCoin.deploy(fundingWallet.address);
    await tokoCoin.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right token name and symbol", async function () {
      expect(await tokoCoin.name()).to.equal("TokoCoin");
      expect(await tokoCoin.symbol()).to.equal("TOKO");
    });

    it("Should assign the total supply to the funding wallet", async function () {
      const fundingWalletBalance = await tokoCoin.balanceOf(fundingWallet.address);
      const totalSupply = await tokoCoin.totalSupply();
      expect(fundingWalletBalance).to.equal(totalSupply);
      expect(ethers.formatUnits(totalSupply, 18)).to.equal("14.0");
    });

    it("Should have correct funding wallet address", async function () {
      expect(await tokoCoin.fundingWallet()).to.equal(fundingWallet.address);
    });

    it("Should have 18 decimals", async function () {
      expect(await tokoCoin.decimals()).to.equal(18);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 5 tokens from fundingWallet to addr1
      await tokoCoin.connect(fundingWallet).transfer(addr1.address, ethers.parseUnits("5", 18));
      const addr1Balance = await tokoCoin.balanceOf(addr1.address);
      expect(ethers.formatUnits(addr1Balance, 18)).to.equal("5.0");

      // Check funding wallet balance
      const fundingWalletBalance = await tokoCoin.balanceOf(fundingWallet.address);
      expect(ethers.formatUnits(fundingWalletBalance, 18)).to.equal("9.0");
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialFundingBalance = await tokoCoin.balanceOf(fundingWallet.address);
      
      // Try to send tokens from addr1 (0 balance) to owner
      await expect(
        tokoCoin.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
      ).to.be.reverted;

      // Funding wallet balance shouldn't have changed
      expect(await tokoCoin.balanceOf(fundingWallet.address)).to.equal(initialFundingBalance);
    });
  });
});
