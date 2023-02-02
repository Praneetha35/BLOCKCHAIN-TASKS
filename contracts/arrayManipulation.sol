// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Array {
    uint256[] public arr;

    function addData(uint256 num) public {
        arr.push(num);
    }

    function getData() public view returns (uint256[] memory) {
        return arr;
    }

    function getLength() public view returns (uint256) {
        return arr.length;
    }

    function getSum() public view returns (uint256) {
        uint256 i;
        uint256 sum = 0;
        for (i = 0; i < arr.length; i++) sum = sum + arr[i];
        return sum;
    }

    function deleteData() public returns (uint256[] memory) {
        arr.pop();
        return arr;
    }

    function search(uint256 num) public view returns (bool) {
        uint256 i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] == num) {
                return true;
            }
        }
        if (i >= arr.length) {
            return false;
        }
    }
}
