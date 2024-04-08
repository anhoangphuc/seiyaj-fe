import styles from "@/styles/components/commons/CustomCheckbox.module.scss";
import classNames from "classnames/bind";
import { ChangeEvent } from "react";

const cx = classNames.bind(styles);
interface CustomCheckBoxProps {
  label?: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  label,
  checked,
  onChange,
}: CustomCheckBoxProps) => {
  return (
    <div className={cx("custom-checkbox")}>
      <div className={cx("input-wrapper")}>
        <div
          className={cx("custom-input", checked ? "active-input" : "")}
        ></div>
        <div
          className={cx(
            "custom-input-check",
            !checked ? "custom-input-uncheck" : ""
          )}
        ></div>
        <input checked={checked} onChange={onChange} type="checkbox" />
      </div>
      {label && <div className="label">{label}</div>}
    </div>
  );
};

export default CustomCheckBox;
