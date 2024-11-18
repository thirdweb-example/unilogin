import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export const THIRDWEB_API_KEY = process.env
  .NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;
if (!THIRDWEB_API_KEY) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

export const client = createThirdwebClient({
  clientId: THIRDWEB_API_KEY,
});
export const chain = baseSepolia;

const chainInfos = {
  [baseSepolia.id]: {
    factoryAddress: "0x9A1151BaB01747cb0e486a6d1865Ca6230D86dF1",
    tokenContract: "0x347D2fD3D0e01c30D2BA3367923F86E6d0a68151",
  },
} as const;

export const FAKE_USDC_CONTRACT = chainInfos[chain.id].tokenContract;
export const factoryAddress = chainInfos[chain.id].factoryAddress;
