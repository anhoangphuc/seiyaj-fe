import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/commons/CustomSelect.module.scss";
import classNames from "classnames/bind";
import ArrowDown from "@/assets/ArrowDown";
const cx = classNames.bind(styles);

interface CustomSelectProps {
  options: Option[];
  selectedOption?: Option;
  placeholder?: string;
  setSelectedOption: (option: Option) => void;
  className?: string;
  disabled?: boolean;
}
export default function CustomSelect({
  options,
  selectedOption,
  placeholder = "",
  setSelectedOption,
  className,
  disabled,
}: CustomSelectProps) {
  const [defaultOption, setDefaultOption] = useState<Option>();
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef(null);
  const handleListDisplay = () => {
    if (disabled) return;
    setShowOptions(!showOptions);
  };
  const handleOptionClick = (option: Option) => {
    setShowOptions(!showOptions);
    setDefaultOption(option);
    setSelectedOption(option);
  };

  useEffect(() => {
    selectedOption
      ? setDefaultOption(selectedOption)
      : setDefaultOption(options[0]);
  }, []);
  const handleClickOutside = (event: any) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cx(
        "custom-select-container",
        className,
        disabled ? "disabled" : ""
      )}
      ref={ref}
    >
      <div
        className={cx("selected-option")}
        onClick={() => handleListDisplay()}
      >
        {defaultOption ? defaultOption.label : placeholder}
        <ArrowDown />
      </div>
      {showOptions && (
        <div className={cx("select-options")}>
          {options.map((option) => {
            return (
              <div
                className={cx("custom-select-option")}
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
