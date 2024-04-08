import styles from "@/styles/components/commons/Switch.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface SwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}
export default function Switch({ checked, onChange }: SwitchProps) {
  return (
    <label className={cx("custom-switch")}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={cx("slider", "round")} />
    </label>
  );
}
