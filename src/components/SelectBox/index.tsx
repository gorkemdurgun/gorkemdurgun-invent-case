import { useRef } from "react";
import styles from "./index.module.scss";

type Props = {
  undefinedValueLabel?: string;
  options: OptionItem[];
  value?: string;
  onChange: (value: string) => void;
};

const SelectBox: React.FC<Props> = ({ undefinedValueLabel, options, value, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={styles.selectBox} onClick={() => selectRef.current?.focus()}>
      <select ref={selectRef} className={styles.select} value={value} onChange={onSelectChange}>
        <option value="">{undefinedValueLabel || "Select..."}</option>
        {options.map((option) => (
          <option key={option.key} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
