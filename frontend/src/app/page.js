"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Dashboard() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        // Here you would typically instantiate provider/contract to fetch balance
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask to interact with BEAST System 3.0.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center border-b border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">BEAST System 3.0</h1>
            <p className="text-sm text-gray-400 mt-1">Decentralized Governance & Resource Allocation</p>
          </div>
          <div>
            {account ? (
              <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg text-sm font-mono">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2 rounded-lg transition-colors"
              >
                {loading ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">LUCR Balance</h3>
            <p className="text-3xl font-semibold mt-2">{balance} <span className="text-lg text-emerald-500 font-normal">LUCR</span></p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Voting Power</h3>
            <p className="text-3xl font-semibold mt-2">0.00 <span className="text-lg text-emerald-500 font-normal">Votes</span></p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active Proposals</h3>
            <p className="text-3xl font-semibold mt-2">0</p>
          </div>
        </div>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Governance Proposals</h2>
          <p className="text-gray-400 text-sm">No active proposals found in the registry.</p>
        </section>
      </div>
    </main>
  );
}
