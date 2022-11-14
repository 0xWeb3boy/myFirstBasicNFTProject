// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity 0.8.7;

contract MermaidNFT is ERC721, Ownable {
    string public constant TOKEN_URI =
        "https://ipfs.io/ipfs/bafybeicrt4onksymn4s6x2uetkddkr2iy3zfvzbel7ryn3xqddv7o3v7za?filename=QmTqGTEPZyukPaca7Rvg3oT7SjRQ1b6TtpzoTQmqGZzvgw.json";

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
