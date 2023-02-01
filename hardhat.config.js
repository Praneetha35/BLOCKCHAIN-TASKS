require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/32adba4f9410437486441fc5197197ad",
      accounts: [
        "72f5d6295c2211297907bb72f443875d7710bfaf0f4420c7ae55792324132ffd",
      ],
    },
  },
};
