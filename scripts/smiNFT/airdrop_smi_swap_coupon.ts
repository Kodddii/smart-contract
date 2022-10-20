// import { ethers, network } from 'hardhat';
// import { resolve } from 'path';
// import inquirer from 'inquirer';

// import _, { values } from 'lodash';

// import { createBaobabSigner, createCypressSigner } from '@fingerlabs/klaytn-wallet-key';

// import smiNFTHolderList from './smiHolderList.json';

// const airDropSmiSwapCoupon = async (networkName: string) => {

//   const SMI_SWAP_COUPON_ADDR =
//     networkName === 'cypress'
//       ? ''
//       : '0xb1D4534d100b7d26ABdED2930e7d6E3280e86848';

//   const keystorePath =
//     networkName === 'cypress'
//       ? 's'
//       : '../../.keystore/baobab_dev.json';

//   const signer =
//     networkName === 'cypress'
//       ? await createCypressSigner(resolve(__dirname, keystorePath))
//       : await createBaobabSigner(resolve(__dirname, keystorePath));

//   // @ts-ignore
//   network.provider = signer.provider;

//   const SmiSwapCoupon = await ethers.getContractFactory('SmiSwapCoupon', signer);
//   const smiSwapCoupon = SmiSwapCoupon.attach(SMI_SWAP_COUPON_ADDR);
  
  
//   const mintTargetChunkedList = _.chunk(smiNFTHolderList, 10)

//   let transactionIndex = 0;
//   for (const chunkedMintTarget of mintTargetChunkedList)  {

//     ++transactionIndex;

//     const addressList = chunkedMintTarget.map((row) => row.to)

//     await smiSwapCoupon.batchMint(addressList);

//     console.log(`Send transaction (${transactionIndex}/${mintTargetChunkedList.length}): mintBulk([${chunkedMintTarget[0]}...${chunkedMintTarget[chunkedMintTarget.length-1]}])`);
//   }
// };

// (async () => {
//   const answer = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'network',
//       message: `select network to work with`,
//       choices: ['baobab', 'cypress'],
//     },
//   ]);

//   return airDropSmiSwapCoupon(answer.network);
// })();