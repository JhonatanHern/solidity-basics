// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    string public storedData;

    function SimpleStorage(string x) public {
        storedData = x;
    }

    function set(string x) external {
        storedData = x;
    }
}
