import { useState } from "react";
import styles from "./index.module.scss";
import { PiGridFourDuotone as GridIcon, PiTableDuotone as TableIcon } from "react-icons/pi";

type DisplayTypeButtonProps = {
  disabled?: boolean;
  activeType: DisplayType;
  onTypeChange: (type: DisplayType) => void;
};

const DisplayTypeButton = ({ disabled, activeType, onTypeChange }: DisplayTypeButtonProps) => {
  const [activeDisplayType, setActiveDisplayType] = useState<DisplayType>(activeType);

  function onChange(type: DisplayType) {
    setActiveDisplayType(type);
    onTypeChange(type);
  }

  return (
    <button disabled={disabled} className={styles.button} onClick={() => onChange(activeDisplayType === "grid" ? "table" : "grid")}>
      {activeDisplayType === "grid" ? <GridIcon size={24} /> : <TableIcon size={24} />}
    </button>
  );
};

export default DisplayTypeButton;
