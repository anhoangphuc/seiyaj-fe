import { ethers } from "ethers";
import getRpcUrl from "./getRpcUrl";

const RPC_URL = getRpcUrl();

console.log("RPC URL", RPC_URL);
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

export default null;
