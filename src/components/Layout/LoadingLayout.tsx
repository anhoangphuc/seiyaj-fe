import styles from "@/styles/components/LoadingLayout.module.scss";
import classNames from "classnames/bind";
import { Circles } from "react-loader-spinner";

const cx = classNames.bind(styles);
const LoadingLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <Circles color="#fff" width={80} height={80} />
    </div>
  );
};

export default LoadingLayout;
