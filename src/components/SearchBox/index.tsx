import { PiMagnifyingGlassDuotone as SearchIcon } from "react-icons/pi";
import styles from "./index.module.scss";
import { useState } from "react";

type Props = {
  onSearch: (search: string) => void;
};

const SearchBox: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState("Pokemon");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  let searchBtnDisabled = !value || value === "";

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search movies..."
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
      />
      <button disabled={searchBtnDisabled} className={styles.button} onClick={handleSubmit}>
        <span className="text-white text-lg">Search</span>
        <SearchIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchBox;
