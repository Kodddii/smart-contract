import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";

import { HardhatUserConfig } from "hardhat/types"

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
    },
};

export default config;
