// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  //parseEther() provides the string representation of a BigNumber instance in wei .
  const lockedAmount = hre.ethers.utils.parseEther("0.0001");

  const Lock = await hre.ethers.getContractFactory("Lock");
  //deploy() will trigger this deployment of the contract
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //deployed() checks if the contract is already available on the blockchain and if the deployment is still ongoing will wait for the deployment transaction to be mined
  await lock.deployed();
  console.log(
    `Lock with 0.0001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
