import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/components/Home.module.scss";
import {Sei} from '@/contracts/types';
import {getSeiTokenContract} from '@/libs/contract-accessor';
import {useWeb3React} from '@web3-react/core';
import Configs from '@/configs';

const cx = classNames.bind(styles);


export default function Home() {
  const router = useRouter();
  const [seiContract, setSeiContract] = useState<Sei>();
  const [seiBalance, setSeiBalance] = useState<string>("0");
  const seiAddress = Configs.addresses.seiToken;
  const { library } = useWeb3React();

  const getSeiBalance = async (seiContract: Sei) => {
    try {
      console.log("user address", await seiContract.signer.getAddress());
      const balance = await seiContract.whitelist(await seiContract.signer.getAddress());
      setSeiBalance(balance.toString());
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
    if (seiContract) {
      getSeiBalance(seiContract);
    }
  }, [seiContract]);

  return (
    <div className={cx("home")}>
      <button> Airdrop </button>
      <div className={cx("container")}>
        Your Sei is <b>{seiBalance}</b>
      </div>
    </div>
  );
}
