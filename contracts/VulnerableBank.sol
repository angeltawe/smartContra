// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
// ⚠️ INTENTIONALLY VULNERABLE — FOR EDUCATIONAL USE ONLY
contract VulnerableBank {
    mapping(address => uint256) public balances;
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
// BUG: External call before state update — classic reentrancy
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        balances[msg.sender] = 0; // State updated FIRST to prevent reentrancy
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}