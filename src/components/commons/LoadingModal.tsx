import { Overlay } from "./Overlay";
import styles from "@/styles/components/LoadingModal.module.scss";
import classNames from "classnames/bind";
import { Circles } from "react-loader-spinner";
const cx = classNames.bind(styles);
interface LoadingModalProps {
  show: boolean;
  onClose: () => void;
}
export default function LoadingModal({ show, onClose }: LoadingModalProps) {
  return (
    <Overlay show={show} onEscPressed={onClose}>
      <div className={cx("loading-modal")}>
        <Circles height="80" width="80" color="#FFB900" ariaLabel="loading" />
      </div>
    </Overlay>
  );
}
