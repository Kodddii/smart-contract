//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721JT is ERC721 {

  constructor(string memory name, string memory symbol) ERC721(name, symbol){}   

  function mint(address to, uint256 tokenId) public {
    _mint(to , tokenId);
  }

  function burn(uint256 tokenId) public {
    _burn(tokenId);
  }

}

