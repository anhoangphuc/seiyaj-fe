import { InjectedConnector } from "@web3-react/injected-connector";

const supportedChainIds = [11155111];

export const injected = new InjectedConnector({
  supportedChainIds,
});
