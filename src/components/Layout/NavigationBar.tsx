import styles from "@/styles/components/NavigationBar.module.scss";
import classNames from "classnames/bind";
import MenuIcon from "@/assets/MenuIcon";
import ConnectWallet from "@/components/commons/ConnectWallet";
import SearchIcon from "@/assets/SearchIcon";
import CartIcon from "@/assets/CartIcon";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";

const cx = classNames.bind(styles);

export default function NavigationBar() {
  const router = useRouter();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navigation-bar")}>
        <div className={cx("left-block")}>
          <MenuIcon />
          <div className={cx("divider")} />
          <button style={{ fontSize: "30px" }} onClick={() => router.push(ROUTES.HOME)}>
            SEI TOKEN
          </button>
        </div>
        <div className={cx("right-block")}>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
