import classNames from 'classnames/bind';
import styles from "@/styles/components/Home.module.scss";
import {useAppDispatch, useAppSelector} from '@/store/hook';
import {userService} from '@/services/user';
import {saveLinkedAddress} from '@/store/authSlice';
import {toast} from 'react-toastify';
import {useEffect, useRef, useState} from 'react';
import Configs from '@/configs';
import {getSeiTokenContract} from '@/libs/contract-accessor';
import {Sei} from '@/contracts/types';
import {useWeb3React} from '@web3-react/core';
import {BigNumber} from 'ethers';
import {convertFromWei} from '@/utils';

const cx = classNames.bind(styles);


export default function LinkAddress() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.auth.email);
  const [seiContract, setSeiContract] = useState<Sei>();
  const address = useAppSelector((state) => state.auth.linkedAddress);
  const token = useAppSelector((state) => state.auth.token);
  const currentAddress = useAppSelector((state) => state.auth.address);
  const [airdropAmount, setAirdropAmount] = useState<string>('0');
  const seiAddress = Configs.addresses.seiToken;
  const { library } = useWeb3React();
  async function linkAddress() {
    try {
      const response = await userService.linkAddress(currentAddress, '', token || '');
      dispatch(saveLinkedAddress(response.address));
      toast('Link address success');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (library) {
      const seiContract = getSeiTokenContract(
        seiAddress,
        library?.getSigner() as any,
      )
      setSeiContract(seiContract);
    }
  }, [library]);

  useEffect(() => {
    async function getAirdropAmount() {
      if (address && seiContract) {
        const amount = await seiContract?.whitelist(address);
        setAirdropAmount(amount ? convertFromWei(amount).toString(): '0');
      }
    }

    const interval = setInterval(() => {
      getAirdropAmount();
    }, 3000);

    return () => clearInterval(interval);
    // getAirdropAmount()
  }, [seiContract]);

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
        const txHash = await seiContract?.faucet(BigNumber.from("1000000000000000000"));
        console.log(txHash);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <div>Your email is {email}</div>
      <div>{address ? `Your address is ${address}` : 'You are not linked address yet'}</div>
      <div>{address ? <button onClick={() => requestWhitelist()}>Request whitelist</button> : <button onClick={() => linkAddress()}>Link Address</button>}</div>
      <div>Airdrop amount is {airdropAmount}</div>
      <button onClick={() => faucet()}>Faucet</button>
    </div>
  )
}
