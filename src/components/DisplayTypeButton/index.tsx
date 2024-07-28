import { useState } from "react";
import styles from "./index.module.scss";
import { PiGridFourDuotone as GridIcon, PiTableDuotone as TableIcon } from "react-icons/pi";

type DisplayTypeButtonProps = {
  activeType: "grid" | "table";
  onTypeChange: (type: "grid" | "table") => void;
};

const DisplayTypeButton = ({ activeType, onTypeChange }: DisplayTypeButtonProps) => {
  const [activeDisplayType, setActiveDisplayType] = useState<"grid" | "table">(activeType);

  function onChange(type: "grid" | "table") {
    setActiveDisplayType(type);
    onTypeChange(type);
  }

  return (
    <button className={styles.button} onClick={() => onChange(activeDisplayType === "grid" ? "table" : "grid")}>
      {activeDisplayType === "grid" ? <GridIcon size={24} /> : <TableIcon size={24} />}
    </button>
  );
};

export default DisplayTypeButton;
