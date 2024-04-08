/* eslint-disable no-undef */

import { ethers } from "ethers";
import { simpleRpcProvider } from "./providers";
import getNodeUrl from "./getRpcUrl";
import UncheckedJsonRpcSigner from "./signer";
import {
  Sei__factory, Sei,
} from "@/contracts/types";

const RPC_URL = getNodeUrl();

export const ETHER_PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL);

export function getProviderOrSigner(library: any, account: any) {
  return account
    ? new UncheckedJsonRpcSigner(library.getSigner(account))
    : ETHER_PROVIDER;
}

/**
 * validate string is address
 * @param {string} value
 * @returns {boolean}
 */

export function isAddress(value: string) {
  try {
    return ethers.utils.getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}

export function getSeiTokenContract(
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
): Sei {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return Sei__factory.connect(address, signerOrProvider);
}
