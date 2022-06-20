// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    address private bankContract;

    modifier onlyBank() {
        require(msg.sender == bankContract, "Only the bank can mint new tokens!");
        _;
    }

    constructor(address _bankAddress) ERC20("yield token", "FREE") {
        bankContract = _bankAddress;
    }

    function mint(address to, uint256 amount) public onlyBank {
        _mint(to, amount);
    }
}