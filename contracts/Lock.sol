// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Lock {
    uint256 public unlockTime;
    address payable public owner; //address payable receives ether whereas plain adress does not

    //Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs.
    // These logs are stored on blockchain and are accessible using address of the contract till the contract is present on the blockchain.
    // An event generated is not accessible from within contracts, not even the one which have created and emitted them.
    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        console.log(
            "Unlock time is %o and block timestamp is %o",
            unlockTime,
            block.timestamp
        );

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}

//Artifacts
//COntains json file of the contract and not necessary to compile the contract again and this can be used
//It saves the ABI, application binary interface of the contract and other
//info related to the contract. Open the contract_name.json in the
//./build/contracts you can see all the information about the contract. If
//you want to deploy the contract again, then you don't have to compile
//it again, the contract bytecode from the contract_name.json file will be used.
