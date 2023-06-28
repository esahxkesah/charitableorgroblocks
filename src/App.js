import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { charitableorgABI } from "./charitableorgABI";

import "./App.css";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const contractAddress = "0x7d30527be529898448Df9fE0312e467243A51c62";
const charitableorg = new web3.eth.Contract(
  charitableorgABI,
  contractAddress
);

function App() {
  const [donationAmount, setDonationAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const donate = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const gas = await charitableorg.methods.donate().estimateGas();
    const result = await charitableorg.methods
      .donate()
      .send({ from: account, gas, value: donationAmount });
    console.log(result);
  };

  const withdraw = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const gas = await charitableorg.methods.withdraw().estimateGas();
    const result = await charitableorg.methods
      .withdraw(withdrawalAmount)
      .send({ from: account, gas });
    console.log(result);
  };

  const setDonation = (e) => {
    setDonationAmount(e.target.value);
  };

  const setWithdrawal = (e) => {
    setWithdrawalAmount(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>E-Sadaqah</h1>
        <form onSubmit={donate}>
          <label>
            Donation Amount (in ETH):
            <input
              type="number"
              step="0.01"
              min="0"
              name="donationAmount"
              value={donationAmount}
              onChange={setDonation}
            />
          </label>
          <input type="submit" value="Donate" />
        </form>
        <br />
        <form onSubmit={withdraw}>
          <label>
            Withdrawal Amount (in ETH):
            <input
              type="number"
              step="0.01"
              min="0"
              name="withdrawalAmount"
              value={withdrawalAmount}
              onChange={setWithdrawal}
            />
          </label>
          <input type="submit" value="Withdraw" />
        </form>
        <br />
        <p>Contract Address: {contractAddress}</p>
      </header>
    </div>
  );
}

export default App;
