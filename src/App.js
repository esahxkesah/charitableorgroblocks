import React, { useState } from "react";
import Web3 from "web3";
import { charitableorgABI } from "./charitableorgABI";

import "./App.css";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const contractAddress = "0x651264122a5DfB0A50355Bd458562827cB81ff18";
const charitableorg = new web3.eth.Contract(
  charitableorgABI,
 
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

  const getContractAddress = () => {
    console.log("Contract Address:", contractAddress);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Contract UI</h1>
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
        <button onClick={getContractAddress} type="button">
          Get Contract Address
        </button>
      </header>
    </div>
  );
}

export default App;
