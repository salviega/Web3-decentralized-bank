require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  paths: { //se enrutan las fuentes del blockchain
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
  defaultNetwork: "kovan",
    networks: {
      hardhat: {
        // If want to do some forking, uncomment this
        // forking: {
        //  url: MAINNET_RPC_URL
        // }
      },
      localhost: {
      },
      kovan: {
        url: "https://kovan.infura.io/v3/7636358c25c44a9499f8a847bc587d68",
        accounts: ["2679a9a0ee4b9195de51f042f0bf885b4f299a9ddcd54b5100910452984d23ca"],
        saveDeployments: true,
      }
    },
  solidity: "0.8.15",
  
};
