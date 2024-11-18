import { secp256k1 } from "@noble/curves/secp256k1";
import {
  ZERO_ADDRESS,
  getContract,
  prepareContractCall,
  readContract,
  sendAndConfirmTransaction,
  toHex,
} from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { upload } from "thirdweb/storage";
import { privateKeyToAccount, smartWallet } from "thirdweb/wallets";
import { chain, client, factoryAddress } from "./constants";
import { encryptPrivateKey } from "./utils";
import { decryptPrivateKey } from "./utils";

export async function connectToSmartWallet(params: {
  username: string;
  pwd: string;
  statusCallback?: (status: string) => void;
}) {
  const { username, pwd, statusCallback } = params;
  statusCallback?.("Checking username...");
  const smartWalletAddress = await getWalletAddressForUser(username);
  const smartWallet = createSmartWallet();

  if (smartWalletAddress !== ZERO_ADDRESS) {
    statusCallback?.("Accessing existing account...");
    // CASE 2 - existing wallet - fetch metadata, decrypt, load local wallet, connect
    // download encrypted wallet from IPFS
    const accountContract = getContract({
      client,
      address: smartWalletAddress,
      chain,
    });
    const metadata = await getContractMetadata({ contract: accountContract });
    const encryptedWallet = metadata.encryptedWallet;
    if (!encryptedWallet) {
      throw new Error("No encrypted wallet found");
    }
    statusCallback?.("Decrypting account...");
    // wait before importing as it blocks the main thread rendering
    await new Promise((resolve) => setTimeout(resolve, 300));
    const privateKey = await decryptPrivateKey(encryptedWallet, pwd);
    const adminAccount = privateKeyToAccount({ privateKey, client });

    statusCallback?.("Connecting...");
    await smartWallet.connect({
      personalAccount: adminAccount,
      client,
    });
  } else {
    statusCallback?.("Creating new account...");
    // CASE 1 - fresh start - create local wallet, encrypt, connect, call register on account with username + metadata
    // generate local wallet
    const privateKey = toHex(secp256k1.utils.randomPrivateKey());
    const adminAccount = privateKeyToAccount({ privateKey, client });
    // encrypt the private key
    const encryptedWallet = await encryptPrivateKey(privateKey, pwd);
    console.log("Encrypted wallet:", encryptedWallet);

    const smartAccount = await smartWallet.connect({
      personalAccount: adminAccount,
      client,
    });

    // register account
    // upload encrypted private key to IPFS
    statusCallback?.("Uploading encrypted account to IPFS...");
    const metadataUri = await upload({
      files: [{ name: username, encryptedWallet }],
      client,
    });

    statusCallback?.("Registering username onchain...");
    // this will deploy the smart wallet and register the username
    const accountContract = getContract({
      client,
      address: smartAccount.address,
      chain,
    });
    const transaction = prepareContractCall({
      contract: accountContract,
      method: "function register(string username, string metadataURI)",
      params: [username, metadataUri],
    });
    await sendAndConfirmTransaction({
      transaction,
      account: smartAccount,
    });
    statusCallback?.("Registered username successfully");
  }

  return smartWallet;
}

function createSmartWallet() {
  const w = smartWallet({
    chain,
    factoryAddress: factoryAddress,
    sponsorGas: true,
  });
  return w;
}

async function getWalletAddressForUser(username: string): Promise<string> {
  const factory = getContract({
    client,
    address: factoryAddress,
    chain,
  });
  const smartWalletAddress = await readContract({
    contract: factory,
    method: "function accountOfUsername(string) returns (address)",
    params: [username],
  });
  return smartWalletAddress;
}
