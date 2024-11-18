"use client";

import EthereumLogo from "@/src/components/EthereumLogo";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useActiveAccount, useConnect } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { chain } from "../lib/constants";
import { connectToSmartWallet } from "../lib/wallet";
import { EthAccount } from "./EthAccount";

export default function EthLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const { connect, isConnecting } = useConnect();
  const account = useActiveAccount();

  const handleLogin = () => {
    setStatusMessages([]);
    connect(async () => {
      return await connectToSmartWallet({
        username,
        pwd: password,
        statusCallback: (status) => {
          setStatusMessages((prev) => [...prev, status]);
        },
      });
    });
  };

  if (isConnecting || account) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full space-y-3">
          {statusMessages.slice(0, -1).map((message) => (
            <div
              key={message}
              className="flex items-center space-x-2 text-green-500"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-white">{message}</span>
            </div>
          ))}

          {!account && statusMessages.length > 0 && (
            <div className="flex items-center space-x-2 text-blue-500">
              <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
              <span className="text-white">
                {statusMessages[statusMessages.length - 1]}
              </span>
            </div>
          )}

          {account && (
            <div className="flex items-center space-x-2 text-blue-500">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-white">
                Connected as{" "}
                <a
                  className="text-blue-500"
                  href={`https://thirdweb.com/${chain.id}/${account.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortenAddress(account.address, 6)}
                </a>
              </span>
            </div>
          )}
        </div>
        <div className="h-4" />
        {account && <EthAccount account={account} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <EthereumLogo className="w-16 h-16 mb-2" />
      <h1 className="text-2xl font-bold text-white mb-4">Ethereum Login</h1>
      <form
        className="space-y-4 max-w-sm"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Login
        </button>
      </form>
      <div className="text-sm text-gray-500 text-center mt-4">
        Login to ethereum with no centralized infrastructure involved. 100%
        onchain and censorship resistant.
      </div>
    </div>
  );
}
