import Layout from "@/components/Layout/Layout";
import { Web3Provider } from "@ethersproject/providers";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@/store/store";
import { Web3ReactProvider } from "@web3-react/core";
import "@/styles/index.scss";
import "@/styles/react-datepicker.scss";
import "@fontsource/dm-sans";
import "@fontsource/poppins";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/pagination.scss";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12_000;
  return library;
}
const App: FC<AppProps> = ({ Component, ...rest }) => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Layout>
            <Component />
          </Layout>
        </Web3ReactProvider>
      </Provider>
    </>
  );
};

export default App;
