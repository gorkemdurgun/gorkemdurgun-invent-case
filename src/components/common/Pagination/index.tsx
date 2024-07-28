import styles from "./index.module.scss";

type Props = {
  totalResults: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ totalResults, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / perPage);

  console.log(totalResults);

  if (totalResults === 0 || totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`${styles.page} ${currentPage === index + 1 ? styles.active : styles.item}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
