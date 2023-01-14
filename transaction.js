const bitcore = require("bitcore-lib");
const axios = require("axios");

const sendBitcoin = async (receiverAddress, amountToSend) => {
  const sochain_network = "BTCTEST";
  const privateKey = "93F2mUJPKbXW8Q9cMNz4ZmpsjgTbNjrMeCaUesTPE7k1DFhSmnk";
  const sourceAddress = "mtVE8anM63kQcgKUC6oQQD9K6xiV4wsr7q";
  const satoshiToSend = amountToSend * 100000000;
  let fee = 0;
  let inputCount = 0;
  //Output is 2 - to receiver's address and change address
  let outputCount = 2;
  const utxos = await axios.get(
    `https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${sourceAddress}`
  );
  const transaction = new bitcore.Transaction();
  let totalAmountAvailable = 0;
  let inputs = [];
  utxos.data.data.txs.forEach(async (element) => {
    let utxo = {};
    utxo.satoshis = Math.floor(Number(element.value) * 100000000);
    utxo.script = element.script_hex;
    utxo.address = utxos.data.data.address;
    utxo.txId = element.txid;
    utxo.outputIndex = element.output_no;
    totalAmountAvailable += utxo.satoshis;
    inputCount += 1;
    inputs.push(utxo);
  });

  //Calculating the transaction size for the transaction fee
  let transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;

  //Transaction fees is set to 20 satoshis per byte
  fee = transactionSize * 20;
  //Check if we have enough satoshis to send
  if (totalAmountAvailable - satoshiToSend - fee < 0) {
    throw new Error("Balance is low for this transaction");
  }

  //Set transaction input
  transaction.from(inputs);

  // Receiving address and amount to be sent is set
  transaction.to(receiverAddress, satoshiToSend);

  // the change address is your address — the address you want to get the balance paid into after sending to the receiver.
  transaction.change(sourceAddress);

  transaction.fee(fee);

  // Signing transaction with private key
  transaction.sign(privateKey);

  // Serializing transactions to get transaction hex.
  const serializedTransaction = transaction.serialize();

  // Sending the transaction using the transaction hex
  const result = await axios({
    method: "POST",
    url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
    data: {
      tx_hex: serializedTransaction,
    },
  });
  return result.data.data;
};
sendBitcoin("mmk3hvvM3ePZeHG1Vm9Uf4yJzknR4RHJgr", 0.00002188);

//Formula to calculate the transaction size:

//transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;

//In every bitcoin transaction, the inputs contribute 180 bytes
//each to the transaction, while the output contributes 34 bytes
//each to the transaction. Then there is an extra 10 bytes you
//add or subtract from the transaction as well.

//Assuming you have a transaction with two inputs and two
//outputs, the transaction size will be 2180+234+10-2 = 436 bytes.
//So, if you want to pay 20 satoshis per byte, the fee will be:
//Fee = 20*436
//Fee = 8720 satoshis

//Because 100,000,000 satoshis equal 1 bitcoin, we should divide 8720/100,000,000.
