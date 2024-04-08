export const TESTNET_CONFIG: Config = {
  supportedNetwork: {
    name: "Sepolia Testnet",
    chainId: "0xaa36a7",
    networkId: 11155111,
    rpcUrl: "https://sepolia.infura.io/v3/",
    currency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  addresses: {
    seiToken: "0x251377f397c4DC3A0AA1A552143Ba60E0644E6cf",
  },
};
