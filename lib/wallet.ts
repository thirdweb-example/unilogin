import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";
import {
  ACCOUNT_ABI,
  THIRDWEB_API_KEY,
  chain,
  factoryAddress,
  gatewayUrl,
} from "./constants";
import {
  ThirdwebSDK,
  Transaction,
  isContractDeployed,
} from "@thirdweb-dev/react";

export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: chain,
    factoryAddress: factoryAddress,
    gasless: true,
    thirdwebApiKey: THIRDWEB_API_KEY || "",
  });
  return smartWallet;
}

export async function getWalletAddressForUser(
  sdk: ThirdwebSDK,
  username: string
): Promise<string> {
  const factory = await sdk.getContract(factoryAddress);
  const smartWalletAddress: string = await factory.call("accountOfUsername", [
    username,
  ]);
  return smartWalletAddress;
}

export async function connectToSmartWallet(
  username: string,
  pwd: string,
  statusCallback?: (status: string) => void
): Promise<SmartWallet> {
  statusCallback?.("Checking username...");
  const sdk = new ThirdwebSDK(chain, {
    gatewayUrls: [gatewayUrl],
  });
  const smartWalletAddress = await getWalletAddressForUser(sdk, username);
  console.log("Smart wallet address", smartWalletAddress);
  const isDeployed = await isContractDeployed(
    smartWalletAddress,
    sdk.getProvider()
  );

  const smartWallet = createSmartWallet();
  const personalWallet = new LocalWallet({
    chain: chain,
  });

  if (isDeployed) {
    statusCallback?.("Username exists, accessing onchain data...");
    // CASE 2 - existing wallet - fetch metadata, decrypt, load local wallet, connect
    console.log("Wallet is deployed");
    // download encrypted wallet from IPFS
    const contract = await sdk.getContract(smartWalletAddress);
    const metadata = await contract.metadata.get();
    console.log("Fetching wallet for", metadata.name);
    const encryptedWallet = metadata.encryptedWallet;
    if (!encryptedWallet) {
      throw new Error("No encrypted wallet found");
    }
    statusCallback?.("Decrypting personal wallet...");
    // wait before importing as it blocks the main thread rendering
    await new Promise((resolve) => setTimeout(resolve, 300));
    await personalWallet.import({
      encryptedJson: encryptedWallet,
      password: pwd,
    });
    console.log("Wallet imported");

    statusCallback?.("Connecting...");
    await smartWallet.connect({
      personalWallet,
    });
  } else {
    statusCallback?.("New username, generating personal wallet...");
    // CASE 1 - fresh start - create local wallet, encrypt, connect, call register on account with username + metadata
    console.log("Wallet is not deployed");
    // generate local wallet
    await personalWallet.deleteSaved();
    await personalWallet.generate();
    const encryptedWallet = await personalWallet.export({
      strategy: "encryptedJson",
      password: pwd,
    });

    await smartWallet.connect({
      personalWallet,
    });

    // register account
    // upload encrypted wallet to IPFS
    statusCallback?.("Uploading encrypted wallet to IPFS...");
    console.log("Uploading encrypted wallet to IPFS");
    const encryptedWalletUri = await sdk.storage.upload({
      name: username,
      encryptedWallet,
    });

    statusCallback?.("Deploying & registering username onchain...");
    await smartWallet.execute(
      await Transaction.fromContractInfo({
        contractAddress: await smartWallet.getAddress(),
        contractAbi: ACCOUNT_ABI,
        provider: sdk.getProvider(),
        signer: await personalWallet.getSigner(),
        method: "register",
        args: [username, encryptedWalletUri],
      })
    );
    console.log("Account registered");
  }

  return smartWallet;
}
