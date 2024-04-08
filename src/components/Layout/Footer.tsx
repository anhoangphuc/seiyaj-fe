import styles from "@/styles/components/Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function Footer() {
  const socialNetworks = ["Telegram", "Twitter", "Instagram", "Discord"];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("first-row")}>
          <img src="/images/MoonBlocks.svg" alt="logoImgUrl" />
          <div className={cx("right-block")}>
            <div>Terms & conditions</div>
            <div>Privacy policy</div>

            <div>Documentation</div>
            <div>Contacts</div>
          </div>
        </div>
        <div className={cx("retangle")}></div>
        <div className={cx("second-row")}>
          <div className={cx("copy-right")}>© Hohenfeld, s.r.o., 2023</div>
          <div className={cx("social-networks")}>
            {socialNetworks.map((socialNetwork) => (
              <img
                key={socialNetwork}
                src={`/images/social-networks/${socialNetwork}.svg`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
