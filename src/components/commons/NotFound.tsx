import styles from "../../styles/components/NotFound.module.scss";
import classNames from "classnames/bind";

interface NotFoundProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
}
const cx = classNames.bind(styles);
const NotFound = ({ className, text = "course", children }: NotFoundProps) => {
  return (
    <div className={cx("not-found", className)}>
      <img src="/images/not-found.svg" alt="not-found" />
      <div className={cx("not-found-description")}>No {text} found</div>
      {children}
    </div>
  );
};

export default NotFound;
