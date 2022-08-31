import React from "react";
import styles from "./ResultItem.module.scss";
import { MdOutlineOpenInNew } from "react-icons/md";
import { types } from "../utils/utils";
import { RiGitRepositoryLine, RiUser6Fill } from "react-icons/ri";

function ResultItem({ active, value, onMouseEnter, url, type }) {
  console.log("type", type);
  return (
    <a href={url} target="_blank" onMouseEnter={onMouseEnter}>
      <div className={`${styles.container} ${active && styles.container__active}`}>
        {type === types.repository && <RiGitRepositoryLine className={styles.container__icon} />}
        {type === types.user && <RiUser6Fill className={styles.container__icon} />}
        <li>{value}</li>
        <MdOutlineOpenInNew className={styles.container__iconLink} />
      </div>
    </a>
  );
}

export default ResultItem;
