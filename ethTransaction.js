const Web3 = require("web3");

// Setting up two wallets
const walletA = {
  address: "0x2593e45abffc79f5e99498Ef86cF3C61bdc6D2D0",
  privateKey:
    "72f5d6295c2211297907bb72f443875d7710bfaf0f4420c7ae55792324132ffd",
};

const walletB = {
  address: "0xf923EB7220c4dA767FB64464DB568A6d2b1F85f6",
};

function sendETH(walletA, walletB, privateKey, amount) {
  // Connecting to an Ethereum node
  const web3 = new Web3(
    "https://goerli.infura.io/v3/32adba4f9410437486441fc5197197ad"
  );

  // Creating transaction object
  let transaction = {
    from: walletA,
    to: walletB,
    gas: web3.utils.toHex(web3.utils.toWei("0.000000000000021", "ether")),
    value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
  };

  // Signing the transaction
  const signTx = new Promise((resolve, reject) => {
    resolve(web3.eth.accounts.signTransaction(transaction, privateKey));
  });

  signTx.then((signedTx) => {
    // Sending the transaction
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          console.log("Transaction hash: ", hash);
        } else {
          console.log("Error: ", error);
        }
      }
    );
  });
}

sendETH(walletA.address, walletB.address, walletA.privateKey, "0.0001");

//Output
//Transaction hash:  0x0b1621500d92050c5a79a3e4753781a6190c6472f473a2701f17467e12011dc0
