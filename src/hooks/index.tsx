import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../libs/connectors";
import configs from "@/configs";
import { useAppDispatch } from "@/store/hook";
import { saveToken, setWrongNetwork } from "@/store/authSlice";
import { toast } from "react-toastify";

const switchNetwork = async () => {
  const { ethereum } = window as any;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: configs.supportedNetwork.chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: configs.supportedNetwork.chainId,
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                name: configs.supportedNetwork.currency.name,
                symbol: configs.supportedNetwork.currency.symbol,
                decimals: 18,
              },
              rpcUrls: [configs.supportedNetwork.rpcUrl],
            },
          ],
        });
      } catch (addError: any) {
        toast.error(addError.toString());
      }
    }
  }
};
export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        const isDeactivated = localStorage.getItem("isDeactivated");
        if (!isDeactivated) {
          localStorage.setItem("isDeactivated", "1");
        } else if (isDeactivated == "2") {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        }
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();
  const dispatch = useAppDispatch();
  const detechNetwork = async () => {
    const { ethereum } = window as any;
    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== configs.supportedNetwork.chainId) {
      dispatch(setWrongNetwork(true));
      switchNetwork();
    } else {
      dispatch(setWrongNetwork(false));
    }
  };
  useEffect((): any => {
    detechNetwork();
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        if (chainId !== configs.supportedNetwork.chainId) {
          dispatch(setWrongNetwork(true));
        } else {
          dispatch(setWrongNetwork(false));
          activate(injected);
        }
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
          dispatch(saveToken(""));
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        if (networkId !== configs.supportedNetwork.networkId) {
          dispatch(setWrongNetwork(true));
        } else {
          dispatch(setWrongNetwork(false));
          activate(injected);
        }
      };

      const handleNetworkDisconnect = async (networkId: string | number) => {
        console.log("Handling 'disconnect' event with payload", networkId);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);
      ethereum.on("disconnect", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
          ethereum.removeListener('"disconnect"', handleNetworkDisconnect);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
