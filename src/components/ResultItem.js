import React from "react";
import styles from "./ResultItem.module.scss";
import { MdOutlineOpenInNew } from "react-icons/md";

function ResultItem({ active, value }) {
  return (
    <div className={`${styles.container} ${active && styles.container__active}`}>
      <li>{value}</li>
      <MdOutlineOpenInNew className={styles.container__icon} />
    </div>
  );
}

export default ResultItem;
