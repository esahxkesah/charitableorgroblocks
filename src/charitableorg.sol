// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract charitableorg {
    address payable public charityAccount;
    uint256 public threshold;
    uint256 public balance;
    address[] public depositors;
    address[] public withdrawers;
    
    event TransactionAlert(address account, uint256 amount, string alertMessage);
    
    constructor(uint256 _threshold) {
        charityAccount = payable(msg.sender);
        threshold = _threshold;
        balance = 0;
    }
    
    modifier onlyCharity() {
        require(msg.sender == charityAccount, "Only the charitable organization can call this function");
        _;
    }
    
    function setThreshold(uint256 _threshold) external onlyCharity {
        threshold = _threshold;
    }
    
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        
        if (msg.value > threshold) {
            emit TransactionAlert(msg.sender, msg.value, "Alert: Suspicious transaction detected!");
        }
        
        balance += msg.value;
        depositors.push(msg.sender);
        
        if (balance > 50 ether) {
            emit TransactionAlert(address(this), balance, "Alert: Possible money laundering detected!");
            
            // Check all depositors
            for (uint256 i = 0; i < depositors.length; i++) {
                emit TransactionAlert(depositors[i], 0, "Alert: Possible money laundering suspect (depositor)");
            }
            
            // Check all withdrawers
            for (uint256 i = 0; i < withdrawers.length; i++) {
                emit TransactionAlert(withdrawers[i], 0, "Alert: Possible money laundering suspect (withdrawer)");
            }
        }
    }
    
    function withdraw(uint256 amount) external onlyCharity {
        require(amount <= address(this).balance, "Insufficient contract balance");
        charityAccount.transfer(amount);
        withdrawers.push(msg.sender);
    }
}
