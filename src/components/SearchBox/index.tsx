import { PiMagnifyingGlassDuotone as SearchIcon } from "react-icons/pi";
import styles from "./index.module.scss";

type Props = {
  search: string;
  onSearch: (search: string) => void;
};

const SearchBox: React.FC<Props> = ({ search, onSearch }) => {
  return (
    <div className={styles.searchBox}>
      <input type="search" placeholder="Search movies..." value={search} onChange={(e) => onSearch(e.target.value)} className={styles.input} />
      <button className={styles.button}>
        <SearchIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default SearchBox;
