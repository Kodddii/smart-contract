import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'hardhat';
import {  BigNumber, utils } from 'ethers';
import { parseEther } from 'ethers/lib/utils';



const ERC20JTcontractAddress = env.get('ERC20JT_CONTRACT_ADDRESS').required().asString();
const walletAddress = env.get('WALLET_ADDRESS').required().asString();
const walletAddressIw = env.get('WALLET_ADDRESS_IW').required().asString();
const privKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();
const privKeyDev = env.get('PRIVATE_KEY_BAOBAB_DEV').required().asString();

(async () => {
  
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');
  const signer = new ethers.Wallet(privKey, provider);
  const signerDev = new ethers.Wallet(privKeyDev, provider);
  const signerContract = await ethers.getContractAt('ERC20JT', ERC20JTcontractAddress);
  
  
 
  const tx = await signerContract.mint(walletAddress, parseEther('50000.0'));
  await tx.wait();

  const balanceOfWallet = await signerContract.balanceOf(walletAddress);
  console.log(balanceOfWallet);

  const tx2 = await signerContract.transfer(walletAddressIw, parseEther('20000.0'));
  await tx2.wait();

  const balanceOfWallet2 = await signerContract.balanceOf(walletAddress);
  console.log(balanceOfWallet2);

  const balanceIw = await signerContract.balanceOf(walletAddressIw);
  console.log(balanceIw);

})();