import Link from "next/link";

import styles from "./index.module.scss";
import Skeleton from "@/components/Skeleton";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) =>
        item.label ? (
          <span key={index} className={styles.breadcrumbItem}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </span>
        ) : (
          <Skeleton key={index} className={styles.skeleton} skeletonType="text" />
        )
      )}
    </nav>
  );
};

export default Breadcrumb;
