/* eslint-disable no-undef */
import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "../libs/providers";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);

  const [provider, setProvider] = useState(library);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider,
    chainId: chainId ?? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || ""),
    ...web3React,
  };
};

export default useActiveWeb3React;
