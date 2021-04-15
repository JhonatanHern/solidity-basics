// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    string storedData;

    constructor(string memory x){
        storedData = x;
    }

    function set(string memory x) external {
        storedData = x;
    }

    function get() external view returns (string memory) {
        return storedData;
    }
}
