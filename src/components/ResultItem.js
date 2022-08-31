import React from "react";
import styles from "./ResultItem.module.scss";
import { MdOutlineOpenInNew } from "react-icons/md";
import { types } from "../utils/utils";
import { RiGitRepositoryLine, RiUser6Fill } from "react-icons/ri";

function ResultItem({ active, value, onMouseEnter, url, type }) {
  const typeOfIcon = () => {
    switch (type) {
      case types.user:
        return <RiUser6Fill className={styles.container__icon} />;
      case types.repository:
        return <RiGitRepositoryLine className={styles.container__icon} />;
    }
  };

  return (
    <a href={url} target="_blank" onMouseEnter={onMouseEnter}>
      <div className={`${styles.container} ${active && styles.container__active}`}>
        {typeOfIcon()}
        <li>{value}</li>
        <MdOutlineOpenInNew className={styles.container__iconLink} />
      </div>
    </a>
  );
}

export default ResultItem;
