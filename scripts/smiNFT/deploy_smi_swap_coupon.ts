import { createBaobabSigner, createCypressSigner } from '@fingerlabs/klaytn-wallet-key';
import { ethers, network } from 'hardhat';
import path from 'path';
import inquirer from 'inquirer';

const smiNFTDeployer = async (networkName: string) => {
  const keystorePath = 
    networkName === 'cypress' 
      ? '' 
      : '../../.keystore/baobab_dev.json';

  const signer = 
    networkName ==='cypress' 
      ? await createCypressSigner(path.resolve(__dirname, keystorePath)) 
      : await createBaobabSigner(path.resolve(__dirname, keystorePath));

  // @ts-ignore
  network.provider = signer.provider;

  const loyaltyAddress = 
    networkName === 'cypress'
      ? ''
      : '0x5aF0EFdeb8126daB51140acc4C99a936F92d64Ed'


  const SMI_NFT_ADDR = 
    networkName === 'cypress'
      ? ''
      : '0x04bc069B355138378FaEB5C8e589Aea2ba7e1344';

  const JGMock_ADDR = 
    networkName === 'cypress'
      ? ''
      : '0x50eED5f09BFC1dB7BD1AefACc8f2a07451452597'

  const NEW_SMI_NFT_ADDR = 
    networkName === 'cypress'
      ? ''
      : '0x701f3236C070cfa67E4D8923abB32E94E9AF9BA5';

  // name, symbol, description, uri
  const BAOBAB_SMI_SWAP_COUPON_DATA = [
    'BOX',
    'BX',
    'This is Box Smi Event NFT TOKEN',
    'https://img.freepik.com/free-photo/cardboard-box-isolated_125540-652.jpg?w=2000',
    SMI_NFT_ADDR
    
  ]

  const CYPRESS_SMI_SWAP_COUPON_DATA = [
    'Special NFT - SMI NFT', //name
    'SMI', //symbol
    `This is event NFT TOKEN for SMI`, //description 
    '',
    SMI_NFT_ADDR
  ]

  const SMI_SWAP_COUPON_DATA = 
    networkName === 'cypress'
      ? CYPRESS_SMI_SWAP_COUPON_DATA
      : BAOBAB_SMI_SWAP_COUPON_DATA;
  
  const SmiSwapCoupon = await ethers.getContractFactory('SmiSwapCoupon', signer);
  const smiSwapCoupon = await SmiSwapCoupon.deploy(
    SMI_SWAP_COUPON_DATA[0],
    SMI_SWAP_COUPON_DATA[1],
    SMI_SWAP_COUPON_DATA[2],
    SMI_SWAP_COUPON_DATA[3],
    SMI_SWAP_COUPON_DATA[4]
  );

  await smiSwapCoupon.deployed();
  console.log('>>> smiNFT Swap coupon addr : %s', smiSwapCoupon.address);
  
}

(async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'network',
      message: `select network to work with`,
      choices: ['baobab', 'cypress'],
    },
  ]);

  return smiNFTDeployer(answer.network);
})();

