import React, { useEffect, useRef, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injected } from "../../libs/connectors";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import styles from "@/styles/components/ConnectWallet.module.scss";
import classNames from "classnames/bind";
import { shortenAddress } from "@/utils";
import { storageService } from "@/services/storage";
import { getUserBalance, logout, saveAccount } from "@/store/authSlice";
import CopyIcon from "@/assets/CopyIcon";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import configs from "@/configs";
import { ROUTES } from "@/constants/routes";

const cx = classNames.bind(styles);

function ConnectWallet() {
  const context = useWeb3React<Web3Provider>();
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { account, activate, deactivate, library } = context;
  const userAddress = useAppSelector((state) => state.auth.address);
  const wrongNetwork = useAppSelector((state) => state.auth.wrongNetwork);
  const balance = useAppSelector((state) => state.auth.balance);
  const [showDialog, setShowDialog] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const intervalBalance = useRef<any>();

  const handleClickOutside = (event: any) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDialog(false);
    }
  };

  const getBalance = async (
    userAddress: string,
    library: Web3Provider | undefined
  ) => {
    if (!userAddress) {
      return;
    }
    if (!library) {
      return;
    }
    if (loadingBalance) return;
    setLoadingBalance(true);
    await dispatch(getUserBalance({ userAddress, library }));
    setLoadingBalance(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalBalance.current);
  }, []);

  const handleCopy = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
      toast.success("Copied to clipboard");
    }
  };

  useEffect(() => {
    if (account) {
      dispatch(saveAccount(account));
      const accountStorage = storageService.getAccount();
      if (!accountStorage || accountStorage.address !== account) {
        storageService.saveAccount({
          address: account,
          email: '',
          accessToken: '',
        });
      }
    }
  }, [account]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (balance === undefined) {
      intervalBalance.current = setInterval(() => {
        getBalance(userAddress, library);
      }, 1000);
    } else {
      clearInterval(intervalBalance?.current);
      intervalBalance.current = null;
    }
  }, [userAddress, library, balance]);

  useEffect(() => {
    getBalance(userAddress, library);
  }, [userAddress, library]);

  const handleLogin = () => {
    activate(injected);
    localStorage.setItem("isDeactivated", "2");
  };
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx(!userAddress ? "connect-wallet-btn" : "account")}
        onClick={() => {
          !userAddress ? handleLogin() : setShowDialog(true);
        }}
        onMouseEnter={() => {
          userAddress && setShowDialog(true);
        }}
      >
        {userAddress ? (
          <>
            <div className={cx("balance-wrapper")}>
              <div className={cx("avatar")}>
                <img src="/images/avatar.png" alt="avatar" />
              </div>
              <div className={cx("balance")}>
                {wrongNetwork ? (
                  "Wrong network"
                ) : loadingBalance ? (
                  <div className={cx("balance-skeleton")} />
                ) : (
                  `${balance !== undefined ? balance.toFixed(4) : "-"} ${
                    configs.supportedNetwork.currency.symbol
                  }`
                )}
              </div>
            </div>
            <div className={cx("divider")}></div>
            <div className={cx("address-wrapper")}>
              <div className={cx("address")}>{shortenAddress(userAddress)}</div>
              <div className={cx("copy")} onClick={handleCopy}>
                <CopyIcon />
              </div>
            </div>
          </>
        ) : (
          "Connect Wallet"
        )}
      </div>
      {showDialog && (
        <div className={cx("dialog")} ref={ref}>
          <div
            className={cx("logout")}
            onClick={() => {
              const isDeactivated = localStorage.getItem("isDeactivated");
              if (!isDeactivated) {
                localStorage.setItem("isDeactivated", "1");
              } else if (isDeactivated == "2") {
                localStorage.setItem("isDeactivated", "1");
              }
              deactivate();
              dispatch(logout());
              setShowDialog(false);
              storageService.removeAccount();
              router.push(ROUTES.HOME);
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}
