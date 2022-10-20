// import { expect } from 'chai';
// import { createBaobabSigner } from '@fingerlabs/klaytn-wallet-key';
// import { ethers } from 'hardhat';
// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
// import { JGMock, EventNFT} from '../typechain-types';
// import path from 'path';
// import { bwbEventNftSol } from '../typechain-types/contracts';
// import exp from 'constants';


// // let jgMock : JGMock
// // let baobabDevKeystorePath = '../../.keystore/baobab_dev.json';
// // let baobabDevKeystorePathMinterRole = '../../.keystore/baobab_dev_minterRole.json';
// // let baobabDevKeystorePathNoMinterRole = '../../.keystore/baobab_dev_noMinterRole.json';
// // let contractAddress = '0x754BB18049f0E4faFC1506F87352Ec63e5B9b033';
// // let minterRoleWalletAddress = '0xc8e1d6ac0bc69116447c9ca3bb606812941b577b';
// // let anyWalletAddress = '0x7cf3e06162e0837592DC94b955E61673d705Bf09';



// describe('BWB_NFT Contract', async() => {
//   let bwbNFT: EventNFT; 
//   let owner: SignerWithAddress;
//   let userA: SignerWithAddress;
//   let userB: SignerWithAddress;
//   beforeEach(async () => {
//     [owner, userA, userB] = await ethers.getSigners();
//     const eventNFT = await ethers.getContractFactory('EventNFT');
//     const BWBNFT = await eventNFT.deploy('EventNFT', 'EN','description','imageURI')
//     bwbNFT = await BWBNFT.deployed();
//   })

//   describe('No minterRole try mint', () => {
//     it('should be failed when no minterRole try mint', async () => {
//       const minterRole = await bwbNFT.MINTER_ROLE();
//       const addMinterRoleTx = await bwbNFT.grantRole(minterRole, userA.address);
//       await addMinterRoleTx.wait();


      
//       await expect(
//         bwbNFT.connect(userB).mint(userA.address)
//       ).to.revertedWith('ERC721PresetMinterPauser: must have minter role to mint')


//     })
//   })

//   describe('No minterRole check hasRole', () => {
//     it('should be return false when checking no minterRole', async () => {
//       const minterRole = await bwbNFT.MINTER_ROLE();
//       const addMinterRoleTx = await bwbNFT.grantRole(minterRole, userA.address);
//       await addMinterRoleTx.wait();
//       const isMinterRole = await bwbNFT.hasRole(minterRole, userB.address);

//       expect(isMinterRole).to.eq(false);
//     })
//   })

  
// })