import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'hardhat';


const ERC20contractAddress = env.get('ERC20_CONTRACT_ADDRESS').required().asString();
const ERC721contractAddress = env.get('ERC721_CONTRACT_ADDRESS').required().asString();
const walletAddress = env.get('WALLET_ADDRESS').required().asString();
const walletAddressDev = env.get('WALLET_ADDRESS_DEV').required().asString();
const walletAddressDev2 = env.get('WALLET_ADDRESS_DEV2').required().asString();
const privKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();
const privKeyDev = env.get('PRIVATE_KEY_BAOBAB_DEV').required().asString();
(async () => {
  
  const provider = new ethers.providers.JsonRpcProvider('https://public-node-api.klaytnapi.com/v1/baobab');
  const signer = new ethers.Wallet(privKey, provider);
  const signerDev = new ethers.Wallet(privKeyDev, provider);
  const signerContract = await ethers.getContractAt('ERC721Mock', ERC721contractAddress);
  const signerDevContract = await ethers.getContractAt('ERC721Mock', ERC721contractAddress)

  // const transferBeforeApproval = await signerDevContract.transferFrom(walletAddress, walletAddressDev, 0);
  // await transferBeforeApproval.wait();
  // const balance = await signerDevContract.balanceOf(walletAddress);
  
  await signerDevContract.connect(signer).approve(walletAddress, 0);

  const whoApproved = await signerDevContract.getApproved(0);
  console.log(whoApproved);

  const transferAfterApproval = await signerContract.transferFrom(walletAddressDev, walletAddress, 0);
  await transferAfterApproval.wait();
  
  const ownerOf0 = await signerDevContract.ownerOf(0);
  console.log(ownerOf0);


  
})();