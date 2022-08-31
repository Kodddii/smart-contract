import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'hardhat';



const ERC721JTcontractAddress = env.get('ERC721JT_CONTRACT_ADDRESS').required().asString();
const walletAddress = env.get('WALLET_ADDRESS').required().asString();
const walletAddressIw = env.get('WALLET_ADDRESS_IW').required().asString();
const privKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();
const privKeyDev = env.get('PRIVATE_KEY_BAOBAB_DEV').required().asString();

(async () => {
  
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');
  const signer = new ethers.Wallet(privKey, provider);
  const signerDev = new ethers.Wallet(privKeyDev, provider);
  const signerContract = await ethers.getContractAt('ERC721JT', ERC721JTcontractAddress);
  

  const tx = await signerContract.mint(walletAddress, 3);
  await tx.wait();

  const balanceOfWallet = await signerContract.balanceOf(walletAddress);
  console.log(balanceOfWallet);

  const tx2 = await signerContract.transferFrom(walletAddress, walletAddressIw, 3);
  await tx2.wait();

  const balanceOfWallet2 = await signerContract.balanceOf(walletAddress);
  console.log(balanceOfWallet2);

  const balanceIw = await signerContract.balanceOf(walletAddressIw);
  console.log(balanceIw);

  const ownerOf3 = await signerContract.ownerOf(3);
  console.log(ownerOf3);
})();