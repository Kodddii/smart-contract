// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol';
import './FixedImageERC721.sol';


contract SmiSwapCoupon is FixedImageERC721 {
  string smiContractAddress;
  
  
  constructor(
    string memory name,
    string memory symbol,
    string memory description,
    string memory imageURI,
    string memory  _smiContractAddress
    
    ) FixedImageERC721(name, symbol, description, imageURI) {
      smiContractAddress = _smiContractAddress;
      
  }
  
  function contractURI() public pure returns (string memory) {
    string memory name = 'SmiSwapCoupon';
    string memory seller_fee_basis_points = '750';
    string memory fee_recipient = '';

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            name,
            '", "seller_fee_basis_points": ',
            seller_fee_basis_points,
            ', "fee_recipient": "',
            fee_recipient,
            '"}'
          )
        )
      )
    );
    return string(abi.encodePacked('data:application/json;base64,', json));
  }

  function getAddress() public view returns (string memory) {
    return smiContractAddress;
  }
  
  

}
