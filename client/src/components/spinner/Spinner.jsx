import React from "react";
import styles from "./Spinner.module.css"; // CSS 모듈 사용 예시

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <img src="/spinner.gif" alt="Loading..." className={styles.spinnerImage} />
    </div>
  );
}