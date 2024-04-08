import styles from "@/styles/components/commons/CollectionCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface CollectionCardProps {
  image: string;
  name: string;
  onClick: () => void;
  url?: string;
  size?: "small" | "medium";
}
export default function CollectionCard({
  image,
  name,
  onClick,
  url,
  size = "medium",
}: CollectionCardProps) {
  return (
    <div className={cx("collection-card", size)}>
      {url ? (
        <a href={url}>
          <div className={cx("image")}>
            <img src={image} alt="collection" />
          </div>
        </a>
      ) : (
        <div className={cx("image")}>
          <img src={image} alt="collection" />
        </div>
      )}
      <div className={cx("info")}>
        <div className={cx("name")} onClick={onClick}>
          {name}
        </div>
      </div>
    </div>
  );
}

export const CollectionCardSkeleton = () => {
  return (
    <div className={cx("collection-card")}>
      <div className={cx("image-skeleton")} />
      <div className={cx("info")}>
        <div className={cx("name-skeleton")} />
      </div>
    </div>
  );
};
