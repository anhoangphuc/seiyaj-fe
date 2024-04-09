import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/components/Home.module.scss";
import {Sei} from '@/contracts/types';
import {getSeiTokenContract} from '@/libs/contract-accessor';
import {useWeb3React} from '@web3-react/core';
import Configs from '@/configs';
import {ROUTES} from '@/constants/routes';
import {convertFromWei} from '@/utils';

const cx = classNames.bind(styles);


export default function Home() {
  const router = useRouter();
  const [seiContract, setSeiContract] = useState<Sei>();
  const [seiBalance, setSeiBalance] = useState<string>("0");
  const seiAddress = Configs.addresses.seiToken;
  const { library } = useWeb3React();

  const getSeiBalance = async (seiContract: Sei) => {
    try {
      const balance = await seiContract.balanceOf(await seiContract.signer.getAddress());
      setSeiBalance(convertFromWei(balance).toString());
    } catch (error) {
      console.error(error);
    }
  }

  const sendMultipleRecipient = async (recipients: string[], amounts: string[]) => {
    try {
      const tx = await seiContract?.sendMultipleRecipient(recipients, amounts);
      console.log("Send multiple recipients success at tx", tx?.hash);
    } catch (error) {
      console.log(error);
    }
  };

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
    if (seiContract) {
      getSeiBalance(seiContract);
    }
  }, [seiContract]);

  return (
    <div className={cx("home")}>
      <button className={cx("airdrop")} onClick={() => router.push(ROUTES.LOGIN)}> Airdrop </button>
      <div className={cx("container")}>
        Your Sei is <b>{seiBalance}</b>
      </div>
    </div>
  );
}
