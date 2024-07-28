import styles from "./index.module.scss";

type Props = {
  className?: string;
  skeletonType: "text" | "rect";
};

const Skeleton: React.FC<Props> = ({ className, skeletonType }) => {
  let classes = `${className} ${styles.skeleton} animate-pulse`;

  return <div data-type={skeletonType} className={classes} />;
};

export default Skeleton;
