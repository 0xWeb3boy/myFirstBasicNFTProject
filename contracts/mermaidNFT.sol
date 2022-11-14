// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity 0.8.7;

contract MermaidNFT is ERC721, Ownable {
    string public constant TOKEN_URI =
        "https://gateway.pinata.cloud/ipfs/QmQxiAF9SynE1Au2ij8b7oPNCng5NJkqMkaSWvuuuXYrA7";

    // State Variables
    uint256 private s_tokenCounter;
    uint256 public cost = 0.03 ether;

    constructor() ERC721("Mermaid", "MMD") {
        s_tokenCounter = 0;
    }

    // Minting NFT and generating unique tokenURI

    function mintNft() public onlyOwner returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public pure override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}
