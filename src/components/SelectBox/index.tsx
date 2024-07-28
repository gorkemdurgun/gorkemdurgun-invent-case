import { useRef } from "react";
import styles from "./index.module.scss";

type Props = {
  options: {
    value?: string;
    label: string;
  }[];
  value?: string;
  onChange: (value?: string) => void;
};

const SelectBox: React.FC<Props> = ({ options, value, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  console.log("SelectBox render", value);

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={styles.selectBox} onClick={() => selectRef.current?.focus()}>
      <select ref={selectRef} className={styles.select} value={value} onChange={onSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
