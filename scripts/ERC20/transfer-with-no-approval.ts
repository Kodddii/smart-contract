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
  const signerContract = await ethers.getContractAt('ERC20Mock', ERC20contractAddress, signer);
  const signerDevContract = await ethers.getContractAt('ERC20Mock', ERC20contractAddress, signerDev);

  const balance = await signerContract.balanceOf(walletAddress);
  console.log(balance);

  const transferBeforeApproval = await signerDevContract.transfer(walletAddressDev, 100);
  await transferBeforeApproval.wait();

  const balanceAfterTransfer = await signerDevContract.balanceOf(walletAddressDev);
  console.log(balanceAfterTransfer);


  


  
})();