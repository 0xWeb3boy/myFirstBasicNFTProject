const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { expect, assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BasinNft test", function () {
      let myFirstNft, deployer;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["all"]);
        myFirstNft = await ethers.getContract("MyFirstNFT");

        console.log(`Contract deployed at ${myFirstNft.address}`);
      });

      describe("Constructor", function () {
        it("Should set the name and symbol correct", async () => {
          const name = await myFirstNft.name();
          assert.equal(name, "MyPet");
          const symbol = await myFirstNft.symbol();
          assert.equal(symbol, "WOOF");
        });

        it("Should initialise the token to zero", async () => {
          const counter = await myFirstNft.getTokenCounter();
          assert.equal(counter, 0);
        });
      });

      describe("Minting the NFT", function () {
        beforeEach(async () => {
          const txResponse = await myFirstNft.mintNft();
          await txResponse.wait(1);
        });
        it("Should allow user to mint NFT and update properly and uodates the token counter", async () => {
          const tokenURI = await myFirstNft.tokenURI(0);
          const tokenCounter = await myFirstNft.getTokenCounter();
          assert.equal(tokenURI, await myFirstNft.TOKEN_URI());
          assert.equal(tokenCounter.toString(), "1");
        });
      });
    });
