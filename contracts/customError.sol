// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract customError {
    error NotOwner(string message, address caller);
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner("You are not the owner", msg.sender);
        }
        _;
    }

    function checkOwner() public view onlyOwner returns (string memory) {
        return "Hello";
    }
}

contract CustomError1 {
    error NotOwner(string message, address caller);

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner("you are not owner", msg.sender);
        }
        _;
    }

    function getHello() external view onlyOwner returns (string memory) {
        return "Hello";
    }
}
