import { waffle, ethers } from 'hardhat';




(async () => {
  const provider = new ethers.providers.JsonRpcProvider() // using default http://localhost:8545
  const signer = new ethers.Wallet('privkey', provider)
  const myContract = await ethers.getContractAt('ERC20Mock', '0x5aF0EFdeb8126daB51140acc4C99a936F92d64Ed', signer)
  const out = await myContract.balanceOf('0x5aF0EFdeb8126daB51140acc4C99a936F92d64Ed')
  console.log(out)
})()
