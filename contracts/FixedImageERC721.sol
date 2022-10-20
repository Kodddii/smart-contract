//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/Base64.sol';

import '@openzeppelin/contracts/access/Ownable.sol';

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract FixedImageERC721 is
  Ownable,
  AccessControlEnumerable,
  ERC721Enumerable,
  ERC721Burnable,
  ERC721Pausable {

  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

  using Counters for Counters.Counter;
  Counters.Counter public tokenIdTracker;

  string private _name;
  string private _symbol;
  string private _description;
  string private _imageURI;

  constructor(
    string memory name,
    string memory symbol,
    string memory description,
    string memory imageURI) ERC721(name, symbol) {

    _name = name;
    _symbol = symbol;
    _description = description;
    _imageURI = imageURI;

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());
  }
  

  function pause() public virtual onlyOwner {
      _pause();
  }


  function unpause() public virtual onlyOwner {
      _unpause();
  }


  function _beforeTokenTransfer(
      address from,
      address to,
      uint256 tokenId
  ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
      super._beforeTokenTransfer(from, to, tokenId);
  }


  /**
    * @dev See {IERC165-supportsInterface}.
    */
  function supportsInterface(bytes4 interfaceId)
      public
      view
      virtual
      override(AccessControlEnumerable, ERC721, ERC721Enumerable)
      returns (bool)
  {
      return super.supportsInterface(interfaceId);
  }


  // function mint(address to, uint256 tokenId) public virtual {
    
  //   require(hasRole(MINTER_ROLE, _msgSender()), 'ERC721PresetMinterPauser: must have minter role to mint');
  //   _mint(to, tokenId);
  // }

  function mint(address to) public virtual {
    require(
      hasRole(MINTER_ROLE, _msgSender()),
      'ERC721PresetMinterPauser: must have minter role to mint'
    );

    uint256 tokenId = tokenIdTracker.current();

    _mint(to, tokenId);

    tokenIdTracker.increment();
  }


  function batchMint(address[] memory toList) external virtual {
    for(uint8 i = 0; i < toList.length; i++) {
      mint(toList[i]);
    }
  }


  function batchTransfer(address from, address[] memory toList, uint256[] memory tokenIdList) external virtual {

    for(uint8 i = 0; i < toList.length; i++) {
      _transfer(from, toList[i], tokenIdList[i]);
    }
  }


  function tokenURI(uint256 tokenId) public virtual view override returns (string memory) {

    require(_exists(tokenId), 'Nonexistent token');

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            _name,
            ' #',
            Strings.toString(tokenId),
            '", "description": "',
            _description,
            '", "image": "',
            _imageURI,
            '"}'
          )
        )
      )
    );
    return string(abi.encodePacked('data:application/json;base64,', json));
  }


  /**
    * @dev This empty reserved space is put in place to allow future versions to add new
    * variables without shifting down storage in the inheritance chain.
    * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    */
  uint256[46] private __gap;
}
