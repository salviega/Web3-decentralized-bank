// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "./token.sol";

contract Bank {

    mapping(address => uint256) public accounts;

    constructor() {

    }

    function totalAsserts() view external returns(uint256) {
        return address(this).balance;
    }

    function deposit() payable external {
        require(msg.value > 0, "Must deposit more than 0 MATIC.");
        accounts[msg.sender] += msg.value; 
    }

    function withdraw(uint256 _amount, address _tokenContract) external {
        require(_amount <= accounts[msg.sender], "Cannot withdraw more that deposited.");

        accounts[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        Token yieldToken = Token(_tokenContract);
        yieldToken.mint(msg.sender, 1 ether);
    }

}





