const contracts = {
  5: [
    {
      chainId: "5",
      name: "goerli",
      contracts: {
        YourContract: {
          address: "0xD07Fe37392a8240A661DD10E025d8A4a33B20459",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "changeOwner",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getDrop",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "triggerText",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cooldownSeconds",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deposit",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Drop",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "getLastAssertion",
              outputs: [
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: "bool",
                          name: "arbitrateViaEscalationManager",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "discardOracle",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "validateDisputers",
                          type: "bool",
                        },
                        {
                          internalType: "address",
                          name: "assertingCaller",
                          type: "address",
                        },
                        {
                          internalType: "address",
                          name: "escalationManager",
                          type: "address",
                        },
                      ],
                      internalType:
                        "struct OptimisticOracleV3Interface.EscalationManagerSettings",
                      name: "escalationManagerSettings",
                      type: "tuple",
                    },
                    {
                      internalType: "address",
                      name: "asserter",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "assertionTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settled",
                      type: "bool",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settlementResolution",
                      type: "bool",
                    },
                    {
                      internalType: "bytes32",
                      name: "domainId",
                      type: "bytes32",
                    },
                    {
                      internalType: "bytes32",
                      name: "identifier",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bond",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "callbackRecipient",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                  ],
                  internalType: "struct OptimisticOracleV3Interface.Assertion",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "dropId",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "assertedClaim",
                  type: "string",
                },
              ],
              name: "propareDropWithAssertedClaim",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "revertMyLastAssertion",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "triggerText",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "cooldownSeconds",
                  type: "uint256",
                },
              ],
              name: "setDrop",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "settleMyLastAssertion",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "dropId",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "triggerDrop",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  10200: [
    {
      chainId: "10200",
      name: "chiado",
      contracts: {
        YourContract: {
          address: "0x22e16EdB7182fa79253C40A39CD866426F06a989",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "changeOwner",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getDrop",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "triggerText",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cooldownSeconds",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deposit",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Drop",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "triggerText",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "cooldownSeconds",
                  type: "uint256",
                },
              ],
              name: "setDrop",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "dropId",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "triggerDrop",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "changeOwner",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getDrop",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "triggerText",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "cooldownSeconds",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deposit",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Drop",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "getLastAssertion",
              outputs: [
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: "bool",
                          name: "arbitrateViaEscalationManager",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "discardOracle",
                          type: "bool",
                        },
                        {
                          internalType: "bool",
                          name: "validateDisputers",
                          type: "bool",
                        },
                        {
                          internalType: "address",
                          name: "assertingCaller",
                          type: "address",
                        },
                        {
                          internalType: "address",
                          name: "escalationManager",
                          type: "address",
                        },
                      ],
                      internalType:
                        "struct OptimisticOracleV3Interface.EscalationManagerSettings",
                      name: "escalationManagerSettings",
                      type: "tuple",
                    },
                    {
                      internalType: "address",
                      name: "asserter",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "assertionTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settled",
                      type: "bool",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "expirationTime",
                      type: "uint64",
                    },
                    {
                      internalType: "bool",
                      name: "settlementResolution",
                      type: "bool",
                    },
                    {
                      internalType: "bytes32",
                      name: "domainId",
                      type: "bytes32",
                    },
                    {
                      internalType: "bytes32",
                      name: "identifier",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "bond",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "callbackRecipient",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "disputer",
                      type: "address",
                    },
                  ],
                  internalType: "struct OptimisticOracleV3Interface.Assertion",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "dropId",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "assertedClaim",
                  type: "string",
                },
              ],
              name: "propareDropWithAssertedClaim",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "revertMyLastAssertion",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "triggerText",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "cooldownSeconds",
                  type: "uint256",
                },
              ],
              name: "setDrop",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "settleMyLastAssertion",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "dropId",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "triggerDrop",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
