import { createBaobabSigner, createCypressSigner } from '@fingerlabs/klaytn-wallet-key';
import { ethers, network } from 'hardhat';
import { resolve } from 'path';
import inquirer from 'inquirer';
import { parseEther } from 'ethers/lib/utils';

const mintNewSmiNFT = async (networkName: string) => {
  const keystorePath =
    networkName === 'cypress'
      ? 's'
      : '../../.keystore/baobab_dev.json';

  const signer =
    networkName === 'cypress'
      ? await createCypressSigner(resolve(__dirname, keystorePath))
      : await createBaobabSigner(resolve(__dirname, keystorePath));

  // @ts-ignore
  network.provider = signer.provider;

  const loyaltyAddress = 
    networkName === 'cypress'
      ? ''
      : '0x5aF0EFdeb8126daB51140acc4C99a936F92d64Ed'

  const SWAP_COUPON_ADDR = 
    networkName === 'cypress'
      ? ''
      : '0xA165907de4147f916d617b209ee1561332bBA2c8';

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

  

  const SmiSwapCoupon = await ethers.getContractFactory('SmiSwapCoupon', signer);
  const smiSwapCoupon = SmiSwapCoupon.attach(SWAP_COUPON_ADDR);
  
  const address = await smiSwapCoupon.getAddress();
  console.log(address);

    

  console.log('New Smi Mint Success')
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

  return mintNewSmiNFT(answer.network);
})();