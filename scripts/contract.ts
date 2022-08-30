import 'dotenv/config';
import * as env from 'env-var';
import { ethers } from 'hardhat';


const ERC20contractAddress = env.get('ERC20_CONTRACT_ADDRESS').required().asString();
const ERC721contractAddress = env.get('ERC721_CONTRACT_ADDRESS').required().asString();
const walletAddress = env.get('WALLET_ADDRESS').required().asString();
const privKey = env.get('PRIVATE_KEY_BAOBAB').required().asString();

(async () => {
  
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privKey, provider);

  console.log(signer.address);

  // ERC20 : 0x9129D339518CCb21aDC22E686A59fdDa0417659E
  // ERC721 : 0xE3EDCCfdACBC846F3FCC9d153704d099ddc01532

  const MyContract = await ethers.getContractFactory('ERC20Mock');
  const myContract = MyContract.attach('0x9129D339518CCb21aDC22E686A59fdDa0417659E');
  const balance = await myContract.balanceOf('0x5aF0EFdeb8126daB51140acc4C99a936F92d64Ed');

  //const myContract = await ethers.getContractAt('ERC721Mock', ERC721contractAddress, signer);
  //const out = await myContract.balanceOf(walletAddress);
  console.log(balance);
})();


