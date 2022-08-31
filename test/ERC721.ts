import { expect, use } from 'chai';
import { ethers, waffle} from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ERC721Mock, ERC721Mock__factory } from '../typechain-types';
import { loadFixture } from 'ethereum-waffle';
import { Token } from '../typechain-types/contracts/token.sol';
import exp from 'constants';

describe('Token contract', () => {
  let erc721: ERC721Mock
  let owner: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  

  beforeEach( async function deploy() {
    [owner, userA, userB] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('ERC721Mock')
    const ERC721 = await Token.deploy('JungiToken', 'JT');
    // console.log(Token);
    erc721 = await ERC721.deployed();
    
  })

  describe('mint', () => {
    it('Minting', async () => {
      await erc721.mint(owner.address); 
      
      const ownerBalance = await erc721.balanceOf(owner.address);
      
      expect(ownerBalance).to.eq(1)
    })
  })
  describe('ownerCheck', () => {
    it('owner check', async () => {
      await erc721.mint(owner.address); 
      
      const ownerNow = await erc721.ownerOf(0);
      
      expect(ownerNow).to.eq(owner.address);
    })
  });

  describe('transferFrom', () => {
    it('transferFrom', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).transferFrom(userA.address, userB.address, 0);
      
      expect(await erc721.balanceOf(userB.address)).to.eq(1)
    })
  })

  describe('pause before transfer', () => {
    it('pause before transferFrom', async () => {
      await erc721.mint(userA.address);
      await erc721.pause();
      
      await expect(
        erc721.connect(userA).transferFrom(userA.address, userB.address, 0)
        ).to.revertedWith('ERC721Pausable: token transfer while paused');
    })
  });

  describe('unpause', () => {
    it('unpause', async () => {
      await erc721.mint(userA.address);
      await erc721.pause();
      await erc721.unpause();

      expect(
        erc721.connect(userA).transferFrom(userA.address, userB.address, 0)
        ).to.not.throw;
      
    })
  })

  describe('approve', () => {
    it('approve', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).approve(userB.address, 0);
      
      const whoApproved = await erc721.getApproved(0);
      
      expect(whoApproved).to.equal(userB.address);
    });
  });

  

  describe('setApproveForAll', () => {
    it('setApproveForAll', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).setApprovalForAll(userB.address, true);
      
      const isApproved = await erc721.connect(userA).isApprovedForAll(userA.address, userB.address);
      
      expect(isApproved).to.eq(true);
    });
  });

  



  describe('burn', () => {
    it('burn', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).burn(0);
      
      const balance = await erc721.balanceOf(userA.address);
      
      expect(balance).to.eq(0);
    });
  });


  describe('approve and transfer', () => {
    it('approve and transfer', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).approve(userB.address, 0);
      await erc721.connect(userB).transferFrom(userA.address, userB.address, 0);
      
      const balanceUserA = await erc721.balanceOf(userA.address);
      const balanceUserB = await erc721.balanceOf(userB.address);
      
      expect(balanceUserA).to.eq(0);
      expect(balanceUserB).to.eq(1);
    });
  });

  describe('approve and burn', () => {
    it('approve and burn', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).approve(userB.address, 0);
      await erc721.connect(userB).burn(0);
      
      const balanceUserA = await erc721.balanceOf(userA.address);
      
      expect(balanceUserA).to.eq(0);
    });
  });


  describe('setApproveForAll and transferFrom', () => {
    it('setApproveForAll and transferFrom', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).setApprovalForAll(userB.address, true);
      await erc721.connect(userB).transferFrom(userA.address, userB.address, 0);
      
      const balanceUserB = await erc721.balanceOf(userB.address);
      
      expect(balanceUserB).to.eq(1);
    });
  });

  describe('setApproveForAll and burn', () => {
    it('setApproveForAll and burn', async () => {
      await erc721.mint(userA.address);
      await erc721.connect(userA).setApprovalForAll(userB.address, true);
      await erc721.connect(userB).burn(0);
      
      const balanceUserA = await erc721.balanceOf(userA.address);
      
      expect(balanceUserA).to.eq(0);
    });
  });

  describe('tokenOfOwnerByIndex', () => {
    it('tokenOfOwnerByIndex', async () => {
      await erc721.mint(userA.address);
      await erc721.mint(userA.address);
      await erc721.mint(userA.address);
      await erc721.mint(userB.address);
      await erc721.mint(userB.address);
      await erc721.mint(userB.address);
      await erc721.mint(userB.address);
      
      const tokenId = await erc721.tokenOfOwnerByIndex(userB.address, 0);
      
      expect(tokenId).to.eq(3);
    })
  })

  describe('totalSupply', () => {
    it('totalSupply', async () => {
      await erc721.mint(userA.address);
      await erc721.mint(userA.address);
      await erc721.mint(userA.address);
      await erc721.mint(userA.address);
      
      const totalSupply = await erc721.totalSupply();
      
      expect(totalSupply).to.eq(4);
    })
  })
  
})
