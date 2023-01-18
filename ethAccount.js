const web3 = require("web3");
const url = "https://mainnet.infura.io/v3/32adba4f9410437486441fc5197197ad";
const web = new web3(url);
console.log(web.eth.accounts.create());

/*{
    address: '0x3fd294BEF5677fCdAC760Ca562999cD3a8B4D601',
    privateKey: '0x60769e250dc422f073d8d5abc7e2ffbbe20f933d8133d8708ae4929615cd4f85',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt]
  }*/
