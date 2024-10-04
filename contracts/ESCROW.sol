// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public payer;
    address public payee;
    address public escrowAgent;
    uint256 public amount;

    constructor(address _payer, address _payee, uint256 _amount) {
        payer = _payer;
        payee = _payee;
        escrowAgent = msg.sender;
        amount = _amount;
    }

    function deposit() public payable {
        require(msg.sender == payer, "Only the payer can deposit");
        require(msg.value == amount, "Must deposit the exact amount");
    }

    function release() public {
        require(msg.sender == escrowAgent, "Only escrow agent can release funds");
        payable(payee).transfer(address(this).balance);
    }

    function refund() public {
        require(msg.sender == escrowAgent, "Only escrow agent can refund");
        payable(payer).transfer(address(this).balance);
    }
}
