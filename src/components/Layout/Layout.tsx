import NavigationBar from "../Layout/NavigationBar";

import Footer from "../Layout/Footer";
import { useWeb3React } from "@web3-react/core";
import { Signer, TypedDataField } from "ethers";
import { useEffect, useState } from "react";
import { storageService } from "@/services/storage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { saveAccount, saveToken } from "@/store/authSlice";
import { backendAPI } from "@/services/api";
import { useEagerConnect, useInactiveListener } from "@/hooks";
import configs from "@/configs";
import { userService } from "@/services/user";
import { setLoadingModal } from "@/store/systemSlice";
import LoadingModal from "@/components/commons/LoadingModal";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const context = useWeb3React();
  const { library } = context;
  const address = useAppSelector((state) => state.auth.address);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const loadingModal = useAppSelector((state) => state.system.loadingModal);
  const { connector } = context;
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  // // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

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

    const payload = {
      address: account,
      chainId: configs.supportedNetwork.networkId,
      signature,
    };
    try {
      let encodedBase64 = Buffer.from(JSON.stringify(payload)).toString(
        "base64"
      );
      const accountData: Account | undefined = storageService.getAccount();
      if (accountData) {
        accountData["accessToken"] = encodedBase64;
        dispatch(saveToken(encodedBase64));
        await userService.login(encodedBase64);
        storageService.saveAccount(accountData);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    const account = storageService.getAccount();
    if (account) {
      if (account.address) {
        dispatch(saveAccount(account.address));
      }
      if (account.accessToken) {
        dispatch(saveToken(account.accessToken));
      }
    }
  }, []);

  useEffect(() => {
    if (address) {
      const token = !!storageService.getAccount()?.accessToken;
      if (!token) {
        signMessage(address);
      }
    }
  }, [address]);

  useEffect(() => {
    if (token) {
      backendAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, [token]);
  return (
    <>
      <div
        style={{
          height: loadingModal ? "100vh" : "100%",
          overflow: loadingModal ? "hidden" : "auto",
        }}
      >
        <NavigationBar />
        <div className="content">{children}</div>
        <Footer />
      </div>
      <LoadingModal
        show={loadingModal}
        onClose={() => dispatch(setLoadingModal(false))}
      />
    </>
  );
}
