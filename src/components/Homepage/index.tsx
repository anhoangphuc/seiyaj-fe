import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/components/Home.module.scss";
import { Sei } from "@/contracts/types";
import { getSeiTokenContract } from "@/libs/contract-accessor";
import { useWeb3React } from "@web3-react/core";
import Configs from "@/configs";
import { ROUTES } from "@/constants/routes";
import {convertFromWei, convertToWei} from "@/utils";
import { useFieldArray, useForm } from "react-hook-form";
import {BigNumber} from 'ethers';

const cx = classNames.bind(styles);

export default function Home() {
  const router = useRouter();
  const [seiContract, setSeiContract] = useState<Sei>();
  const [seiBalance, setSeiBalance] = useState<string>("0");
  const seiAddress = Configs.addresses.seiToken;
  const [transferMsg, setTransferMsg] = useState<string>("");
  const { library } = useWeb3React();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { recipients: [{ amount: "", address: "" }] } });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "recipients",
  });
  const getSeiBalance = async (seiContract: Sei) => {
    try {
      const balance = await seiContract.balanceOf(
        await seiContract.signer.getAddress()
      );
      setSeiBalance(convertFromWei(balance).toString());
    } catch (error) {
      console.error(error);
    }
  };

  const sendMultipleRecipient = async (
    recipients: string[],
    amounts: string[]
  ) => {
    try {
      const tx = await seiContract?.sendMultipleRecipient(recipients, amounts);
      setTransferMsg(`Send multiple recipients success ${tx?.hash}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (library) {
      const seiContract = getSeiTokenContract(
        seiAddress,
        library?.getSigner() as any
      );
      setSeiContract(seiContract);
    }
  }, [library]);

  useEffect(() => {
    const interval = setInterval(() => {
        if (seiContract) {
          getSeiBalance(seiContract);
        }
      },
      2000);
    return  () => clearInterval(interval);
  }, [seiContract]);
  const handleTransfer = async (data: any) => {
    console.log(data);
    const recipients: string[] = [];
    const amounts: string[] = [];
    data.recipients = data.recipients.forEach(
      (item: { amount: string; address: string }) => {
        if (item.amount && item.address) {
          recipients.push(item.address);
          amounts.push(convertToWei(BigNumber.from(item.amount)).toString());
        }
      }
    );
    console.log(recipients, amounts);
    if (recipients.length > 0 && amounts.length > 0) {
      sendMultipleRecipient(recipients, amounts);
    }
  };

  return (
    <div className={cx("home")}>
      <button
        className={cx("airdrop")}
        onClick={() => router.push(ROUTES.LOGIN)}
      >
        {" "}
        Airdrop{" "}
      </button>
      <div className={cx("container")}>
        Your Sei is <b>{seiBalance}</b>
      </div>
      <form
        onSubmit={handleSubmit(handleTransfer)}
        className={cx("transfer-form")}
      >
        <div className={cx("transfer")}>
          <div className={cx("left-column")}>
            {fields.map((item, index) => (
              <div key={item.id} className={cx("row")}>
                <div className={cx("recipient")}>
                  <input
                    placeholder="address"
                    {...register(`recipients.${index}.address`)}
                  />
                </div>
                <div className={cx("amount")}>
                  <input
                    placeholder="amount"
                    {...register(`recipients.${index}.amount`)}
                  />
                </div>
              </div>
            ))}

            <div>{transferMsg}</div>

            <div className={cx("form-footer")}>
              <button type="submit" className={cx("transfer-btn")}>
                Transfer{" "}
              </button>
            </div>
          </div>
          <div className={cx("right-column")}>
            <button
              onClick={() => {
                append({
                  amount: "",
                  address: "",
                });
              }}
              type="button"
            >
              Add more recipient
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
