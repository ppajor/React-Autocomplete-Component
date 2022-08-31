import React from "react";
import styles from "./ErrorMessage.module.scss";

function ErrorMessage({ message }) {
  return <p className={styles.message}>{message}</p>;
}

export default ErrorMessage;
