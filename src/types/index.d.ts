declare interface Config {
  supportedNetwork: {
    name: string;
    chainId: string;
    networkId: number;
    rpcUrl: string;
    currency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
  addresses: {
    [key: string]: string;
  };
}
declare interface Option {
  value: string;
  label: string;
}

