import { useRef } from "react";
import styles from "./index.module.scss";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const SelectBox: React.FC<Props> = ({ options, value, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className={styles.selectBox} onClick={() => selectRef.current?.focus()}>
      <select ref={selectRef} className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
