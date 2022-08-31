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
  const myContract = await ethers.getContractAt('ERC721Mock', ERC721contractAddress, signer);
  // const owner = await myContract.ownerOf(1);
  
  const tx = await myContract.connect(signer).transferFrom(walletAddress, walletAddressDev, 1);
  await tx.wait();

  const ownerOf0 = await myContract.ownerOf(1);
  console.log(ownerOf0);

  // console.log(owner);
  // await myContract.connect(signer).transferFrom(walletAddress, walletAddressDev, 0)
  const balanceOfDev = await myContract.balanceOf(walletAddressDev);
  console.log(balanceOfDev);

  const balanceOfWallet = await myContract.balanceOf(walletAddress);
  console.log(balanceOfWallet);

  

  // const MyContract = await ethers.getContractFactory('ERC20Mock');
  // const myContract = MyContract.attach(ERC20contractAddress);
  // const balance = await myContract.balanceOf(walletAddress);

  //const myContract = await ethers.getContractAt('ERC721Mock', ERC721contractAddress, signer);
  //const out = await myContract.balanceOf(walletAddress);
  // console.log(balance);
})();


