import { ethers } from 'hardhat';

import { ERC20JT } from '../../typechain-types';

let jgtoken: ERC20JT;


export const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log('deployer address : ', deployer.address);
  
  const Token = await ethers.getContractFactory('ERC20JT')
  const JGToken = await Token.deploy('JgToken','JT');
  jgtoken = await JGToken.deployed();
  console.log('Token address', jgtoken.address);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1)
  });