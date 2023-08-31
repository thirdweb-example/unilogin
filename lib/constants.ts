import { Goerli, BaseGoerli } from "@thirdweb-dev/chains";

export const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const chain = BaseGoerli;

const chainInfos = {
  [Goerli.chainId]: {
    factoryAddress: "0xF8631a71b51129453fb70057aAcA80d4c2f0929F",
    openEditionContract: "0xf91E0ffA115F8390aE1DE0801A847924Df8ad282",
  },
  [BaseGoerli.chainId]: {
    factoryAddress: "0x2637758c0777d58E3278A6022730e997A83d04bF",
    openEditionContract: "0x4EFe47576E48cC383805A9E8FC3e02Ddb1a5D535",
  },
} as const;

export const DEV_CAT_CONTRACT = chainInfos[chain.chainId].openEditionContract;
export const factoryAddress = chainInfos[chain.chainId].factoryAddress;

export const ACCOUNT_ABI = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "_entrypoint",
        internalType: "contract IEntryPoint",
      },
      {
        type: "address",
        name: "_factory",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AdminUpdated",
    inputs: [
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "bool",
        name: "isAdmin",
        indexed: false,
        internalType: "bool",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ContractURIUpdated",
    inputs: [
      {
        type: "string",
        name: "prevURI",
        indexed: false,
        internalType: "string",
      },
      {
        type: "string",
        name: "newURI",
        indexed: false,
        internalType: "string",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        type: "uint8",
        name: "version",
        indexed: false,
        internalType: "uint8",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAssignment",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "signer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "tuple",
        name: "request",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address",
            name: "target",
            internalType: "address",
          },
          {
            type: "uint8",
            name: "action",
            internalType: "enum IAccountPermissions.RoleAction",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        indexed: false,
        internalType: "struct IAccountPermissions.RoleRequest",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleUpdated",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "tuple",
        name: "restrictions",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address[]",
            name: "approvedTargets",
            internalType: "address[]",
          },
          {
            type: "uint256",
            name: "maxValuePerTransaction",
            internalType: "uint256",
          },
          {
            type: "uint128",
            name: "startTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "endTimestamp",
            internalType: "uint128",
          },
        ],
        indexed: false,
        internalType: "struct IAccountPermissions.RoleRestrictions",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "addDeposit",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "changeRole",
    inputs: [
      {
        type: "tuple",
        name: "_req",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address",
            name: "target",
            internalType: "address",
          },
          {
            type: "uint8",
            name: "action",
            internalType: "enum IAccountPermissions.RoleAction",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        internalType: "struct IAccountPermissions.RoleRequest",
      },
      {
        type: "bytes",
        name: "_signature",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "entryPoint",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IEntryPoint",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "execute",
    inputs: [
      {
        type: "address",
        name: "_target",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_value",
        internalType: "uint256",
      },
      {
        type: "bytes",
        name: "_calldata",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeBatch",
    inputs: [
      {
        type: "address[]",
        name: "_target",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "_value",
        internalType: "uint256[]",
      },
      {
        type: "bytes[]",
        name: "_calldata",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllRoleMembers",
    inputs: [
      {
        type: "bytes32",
        name: "_role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "address[]",
        name: "",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDeposit",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNonce",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleRestrictions",
    inputs: [
      {
        type: "bytes32",
        name: "_role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address[]",
            name: "approvedTargets",
            internalType: "address[]",
          },
          {
            type: "uint256",
            name: "maxValuePerTransaction",
            internalType: "uint256",
          },
          {
            type: "uint128",
            name: "startTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "endTimestamp",
            internalType: "uint128",
          },
        ],
        internalType: "struct IAccountPermissions.RoleRestrictions",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleRestrictionsForAccount",
    inputs: [
      {
        type: "address",
        name: "_account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address[]",
            name: "approvedTargets",
            internalType: "address[]",
          },
          {
            type: "uint256",
            name: "maxValuePerTransaction",
            internalType: "uint256",
          },
          {
            type: "uint128",
            name: "startTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "endTimestamp",
            internalType: "uint128",
          },
        ],
        internalType: "struct IAccountPermissions.RoleRestrictions",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        type: "address",
        name: "_defaultAdmin",
        internalType: "address",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAdmin",
    inputs: [
      {
        type: "address",
        name: "_account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isValidSignature",
    inputs: [
      {
        type: "bytes32",
        name: "_hash",
        internalType: "bytes32",
      },
      {
        type: "bytes",
        name: "_signature",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "magicValue",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isValidSigner",
    inputs: [
      {
        type: "address",
        name: "_signer",
        internalType: "address",
      },
      {
        type: "tuple",
        name: "_userOp",
        components: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "nonce",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "initCode",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "callData",
            internalType: "bytes",
          },
          {
            type: "uint256",
            name: "callGasLimit",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "verificationGasLimit",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "preVerificationGas",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "maxFeePerGas",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "paymasterAndData",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "signature",
            internalType: "bytes",
          },
        ],
        internalType: "struct UserOperation",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [
      {
        type: "bytes[]",
        name: "data",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        type: "bytes[]",
        name: "results",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155BatchReceived",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155Received",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC721Received",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
      {
        type: "bytes",
        name: "",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bytes4",
        name: "",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "register",
    inputs: [
      {
        type: "string",
        name: "username",
        internalType: "string",
      },
      {
        type: "string",
        name: "metadataURI",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAdmin",
    inputs: [
      {
        type: "address",
        name: "_account",
        internalType: "address",
      },
      {
        type: "bool",
        name: "_isAdmin",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setContractURI",
    inputs: [
      {
        type: "string",
        name: "_uri",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRoleRestrictions",
    inputs: [
      {
        type: "tuple",
        name: "_restrictions",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address[]",
            name: "approvedTargets",
            internalType: "address[]",
          },
          {
            type: "uint256",
            name: "maxValuePerTransaction",
            internalType: "uint256",
          },
          {
            type: "uint128",
            name: "startTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "endTimestamp",
            internalType: "uint128",
          },
        ],
        internalType: "struct IAccountPermissions.RoleRestrictions",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        type: "bytes4",
        name: "interfaceId",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "validateUserOp",
    inputs: [
      {
        type: "tuple",
        name: "userOp",
        components: [
          {
            type: "address",
            name: "sender",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "nonce",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "initCode",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "callData",
            internalType: "bytes",
          },
          {
            type: "uint256",
            name: "callGasLimit",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "verificationGasLimit",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "preVerificationGas",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "maxFeePerGas",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
          },
          {
            type: "bytes",
            name: "paymasterAndData",
            internalType: "bytes",
          },
          {
            type: "bytes",
            name: "signature",
            internalType: "bytes",
          },
        ],
        internalType: "struct UserOperation",
      },
      {
        type: "bytes32",
        name: "userOpHash",
        internalType: "bytes32",
      },
      {
        type: "uint256",
        name: "missingAccountFunds",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "validationData",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verifyRoleRequest",
    inputs: [
      {
        type: "tuple",
        name: "req",
        components: [
          {
            type: "bytes32",
            name: "role",
            internalType: "bytes32",
          },
          {
            type: "address",
            name: "target",
            internalType: "address",
          },
          {
            type: "uint8",
            name: "action",
            internalType: "enum IAccountPermissions.RoleAction",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        internalType: "struct IAccountPermissions.RoleRequest",
      },
      {
        type: "bytes",
        name: "signature",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "success",
        internalType: "bool",
      },
      {
        type: "address",
        name: "signer",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawDepositTo",
    inputs: [
      {
        type: "address",
        name: "withdrawAddress",
        internalType: "address payable",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
];
