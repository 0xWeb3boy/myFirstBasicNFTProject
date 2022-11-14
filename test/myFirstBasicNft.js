const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { expect, assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Mermaid test", function () {
      let mermaidNft, deployer;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["all"]);
        mermaidNft = await ethers.getContract("MermaidNFT");

        console.log(`Contract deployed at ${mermaidNft.address}`);
      });

      describe("Constructor", function () {
        it("Should set the name and symbol correct", async () => {
          const name = await mermaidNft.name();
          assert.equal(name, "Mermaid");
          const symbol = await mermaidNft.symbol();
          assert.equal(symbol, "MMD");
        });

        it("Should initialise the token to zero", async () => {
          const counter = await mermaidNft.getTokenCounter();
          assert.equal(counter, 0);
        });
      });

      describe("Minting the NFT", function () {
        beforeEach(async () => {
          const txResponse = await mermaidNft.mintNft();
          await txResponse.wait(1);
        });
        it("Should allow user to mint NFT and update properly and uodates the token counter", async () => {
          const tokenURI = await mermaidNft.tokenURI(0);
          const tokenCounter = await mermaidNft.getTokenCounter();
          assert.equal(tokenURI, await mermaidNft.TOKEN_URI());
          assert.equal(tokenCounter.toString(), "1");
        });
      });
    });
