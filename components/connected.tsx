import {
  SmartContract,
  ThirdwebNftMedia,
  ThirdwebSDKProvider,
  useAddress,
  useClaimNFT,
  useClaimedNFTSupply,
  useContract,
  useOwnedNFTs,
  useTransferNFT,
} from "@thirdweb-dev/react";
import { Signer } from "ethers";
import { DEV_CAT_CONTRACT, chain } from "../lib/constants";
import styles from "../styles/Home.module.css";
import { shortenIfAddress } from "../lib/addresses";
import { Blocks } from "react-loader-spinner";
import { useState } from "react";

export const Connected = ({
  username,
  signer,
}: {
  username: string;
  signer: Signer;
}) => {
  return (
    <ThirdwebSDKProvider signer={signer} activeChain={chain}>
      <ConnectedInner username={username} />
    </ThirdwebSDKProvider>
  );
};

const ConnectedInner = ({ username }: { username: string }) => {
  const address = useAddress();
  const { contract } = useContract(DEV_CAT_CONTRACT);
  const { mutate: claim, isLoading: claimLoading } = useClaimNFT(contract);
  const { mutate: transfer, isLoading: transferLoading } =
    useTransferNFT(contract);
  const {
    data: ownedNFTs,
    isLoading: nftsLoading,
    refetch,
  } = useOwnedNFTs(contract, address);
  const [transferTo, setTransferTo] = useState("");
  return (
    <>
      <h1 className={styles.title} style={{ marginTop: "2rem" }}>
        Welcome <br />
        <span className={styles.gradientText1}>{username}</span>
      </h1>
      <hr className={styles.divider} />
      <p className={styles.label}>
        Smart Wallet Address:{" "}
        <a
          href={`https://thirdweb.com/${chain.slug}/${address}`}
          target="_blank"
        >
          {shortenIfAddress(address)}
        </a>
      </p>
      <div className={styles.filler}>
        {nftsLoading || claimLoading || transferLoading ? (
          <>
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
            <p>
              {nftsLoading
                ? "Loading your account..."
                : claimLoading
                ? "Claiming..."
                : "Transfering..."}
            </p>
          </>
        ) : ownedNFTs && ownedNFTs.length > 0 ? (
          <>
            <ThirdwebNftMedia metadata={ownedNFTs[0].metadata} />
            <p>You own</p>
            <p className={styles.description} style={{ fontWeight: "bold" }}>
              ethCC DevCat #{ownedNFTs[0].metadata.id}
            </p>
            <p style={{ color: "#999" }}>
              view on{" "}
              <a
                href={`https://testnets.opensea.io/assets/base-goerli/${DEV_CAT_CONTRACT}/${ownedNFTs[0].metadata.id}`}
                target="_blank"
              >
                OpenSea
              </a>
            </p>

            <hr className={styles.divider} />
            <div className={styles.row_center} style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Wallet address / ENS"
                className={styles.input}
                style={{ borderRadius: "5px 0 0 5px" }}
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              />
              <button
                className={styles.button}
                style={{
                  marginTop: 0,
                  width: "130px",
                  borderRadius: "0 5px 5px 0",
                }}
                onClick={() =>
                  transfer(
                    {
                      to: transferTo,
                      tokenId: ownedNFTs[0].metadata.id,
                    },
                    {
                      onSuccess: async () => {
                        alert("Transfer successful");
                        // wait for 1 sec before refetching
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        await refetch();
                      },
                      onError: (err) => alert((err as any).reason || err),
                    }
                  )
                }
              >
                Transfer
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.description}>Claim your ethCC DevCat</p>
            <button
              className={styles.button}
              onClick={() =>
                claim(
                  {
                    quantity: 1,
                  },
                  {
                    onSuccess: async () => {
                      alert("Claim successful");
                      // wait for 1 sec before refetching
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      await refetch();
                    },
                    onError: (err) => {
                      let reason = (err as any).reason || err;
                      if (reason == "!Qty") {
                        reason = "Already claimed max number of DevCats!";
                      }
                      alert(reason);
                    },
                  }
                )
              }
            >
              Claim
            </button>
          </>
        )}
      </div>
      <TotalClaimed contract={contract} />
    </>
  );
};

const TotalClaimed = ({
  contract,
}: {
  contract: SmartContract | undefined;
}) => {
  const { data: totalClaimed } = useClaimedNFTSupply(contract);
  return (
    <div className={styles.column_center} style={{ marginBottom: "2rem" }}>
      <p style={{ color: "#999" }}>
        <b>{totalClaimed?.toString() || "-"}</b> DevCats have been claimed
      </p>
      <p className={styles.label} style={{ color: "#999", marginTop: "5px" }}>
        Contract:{" "}
        <a
          href={`https://thirdweb.com/${chain.slug}/${DEV_CAT_CONTRACT}`}
          target="_blank"
        >
          {shortenIfAddress(DEV_CAT_CONTRACT)}
        </a>
      </p>
    </div>
  );
};
