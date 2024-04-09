import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {useAppDispatch, useAppSelector} from '@/store/hook';
import {userService} from '@/services/user';
import {saveLinkedAddress} from '@/store/authSlice';
import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';
import Configs from '@/configs';
import {getSeiTokenContract} from '@/libs/contract-accessor';
import {Sei} from '@/contracts/types';
import {useWeb3React} from '@web3-react/core';
import {BigNumber, Signer, TypedDataField} from 'ethers';
import {convertFromWei} from '@/utils';
import {WeiPerEther} from '@ethersproject/constants';
import configs from '@/configs';

const cx = classNames.bind(styles);


export default function LinkAddress() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);
  const [seiContract, setSeiContract] = useState<Sei>();
  const address = useAppSelector((state) => state.auth.linkedAddress);
  const token = useAppSelector((state) => state.auth.token);
  const currentAddress = useAppSelector((state) => state.auth.address);
  const [airdropAmount, setAirdropAmount] = useState<string>('0');
  const [faucetAmount, setFaucetAmount] = useState<string>('0');
  const [faucetMsg, setFaucetMsg] = useState<string>('');
  const seiAddress = Configs.addresses.seiToken;
  const { library } = useWeb3React();
  const [ newLinkAddress, setNewLinkAddress ] = useState<string>('');

  const signMessage = async (account: string) => {
    const signer: Signer = library?.getSigner(account);
    const domain = {
      name: "marketplace-api",
      chainId: configs.supportedNetwork.networkId,
    };
    const types = {
      Request: [
        { name: "request", type: "string" },
        { name: "userAddress", type: "address" },
      ],
    } as Record<string, TypedDataField[]>;
    const values = {
      request: "eth_login",
      userAddress: account,
    };
    //@ts-ignore
    const signature = await signer?._signTypedData(domain, types, values);

    return signature;
  };

  async function linkAddress() {
    try {
      const signature: string = await signMessage(currentAddress);
      const response = await userService.linkAddress(currentAddress, signature, token || '');
      dispatch(saveLinkedAddress(response.address));
      setNewLinkAddress(response.address);
      toast('Link address success');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      const seiContract = getSeiTokenContract(
        seiAddress,
        library?.getSigner() as any,
      )
      setSeiContract(seiContract);
  }, [library]);

  useEffect(() => {
    async function getAirdropAmount() {
      if (newLinkAddress && newLinkAddress.length > 0 && seiContract) {
        const amount = await seiContract?.whitelist(newLinkAddress);
        setAirdropAmount(amount ? convertFromWei(amount).toString(): '0');
      }
    }

    const interval = setInterval(() => {
      getAirdropAmount();
    }, 3000);

    getAirdropAmount()
    return () => clearInterval(interval);
  }, [seiContract, newLinkAddress]);

  async function requestWhitelist() {
    try {
      const response = await userService.requestWhitelist(token || '');
      toast('Request whitelist success');
    } catch (error) {
      console.error(error);
    }
  }

  async function faucet() {
    if (address) {
      try {
        if (!currentAddress || address !== currentAddress) {
          toast.error("Switch connected address to match linked address");
          return;
        }
        const amount = BigNumber.from(faucetAmount).mul(WeiPerEther);
        const tx = await seiContract?.faucet(amount);
        setFaucetMsg(`Faucet ${faucetAmount} success at tx ${tx?.hash}`);
        toast.success(`Faucet ${faucetAmount} success`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className={cx("link-address")}>
      <div>
        <div>Email: {email}</div>
        <div>{address ? `Linked address: ${address}` : 'You are not linked address yet'}</div>
        <div>{address ? <button onClick={() => requestWhitelist()}>Request whitelist</button> : <button onClick={() => linkAddress()}>Link Address</button>}</div>
        <div>Your available airdrop amount is {airdropAmount}</div>
      </div>
      <div>
        <input type={"text"} placeholder={airdropAmount} onChange={(event) => setFaucetAmount(event.target.value)}/>
        <button onClick={() => faucet()}>Faucet</button>
        <div>{faucetMsg}</div>
      </div>
    </div>
  )
}
