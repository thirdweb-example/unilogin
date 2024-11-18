import { useState } from "react";
import { getContract } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  ClaimButton,
  ConnectButton,
  darkTheme,
  getDefaultToken,
  useReadContract,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";
import { chain, client, FAKE_USDC_CONTRACT } from "../lib/constants";
export function EthAccount({
  account,
}: {
  account: Account;
}) {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const metadataQuery = useReadContract(getContractMetadata, {
    contract: getContract({
      address: account.address,
      chain,
      client,
    }),
  });
  return (
    <div className="flex flex-col w-full max-w-sm py-4 gap-4">
      <ConnectButton
        client={client}
        theme={darkTheme({
          colors: {
            modalBg: "#000",
            connectedButtonBg: "#000",
          },
        })}
        supportedTokens={{
          [chain.id]: [
            {
              address: FAKE_USDC_CONTRACT,
              name: "Demo USDC",
              icon: getDefaultToken(chain, "USDC")?.icon,
              symbol: "USDC",
            },
          ],
        }}
        detailsButton={{
          connectedAccountName: metadataQuery.data?.name,
          displayBalanceToken: {
            [chain.id]: FAKE_USDC_CONTRACT,
          },
          style: {
            width: "100%",
          },
        }}
        detailsModal={{
          connectedAccountName: metadataQuery.data?.name,
          hideBuyFunds: true,
        }}
      />
      <ClaimButton
        theme={darkTheme({
          colors: {
            primaryButtonBg: "#111827",
            primaryButtonText: "#fff",
          },
        })}
        onTransactionSent={(result) => {
          setTransactionHash(result.transactionHash);
        }}
        contractAddress={FAKE_USDC_CONTRACT}
        chain={chain}
        client={client}
        claimParams={{
          type: "ERC20",
          quantity: "0.5",
        }}
      >
        Get some (fake) USDC
      </ClaimButton>
      {transactionHash && (
        <a
          className="w-full text-blue-500 hover:text-blue-400 text-sm text-center"
          href={`${chain.blockExplorers?.[0].url}/tx/${transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          View transaction
        </a>
      )}
    </div>
  );
}
