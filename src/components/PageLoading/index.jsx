import React from "react";
import { Spin } from "antd";

// import { ReactComponent as Logo } from "@/assets/images/splash-logo.svg";
import styles from "./style.less";

export default function PageLoading() {
  return (
    <div className={styles.splash}>
      <div className={styles.inner}>
        <Spin data-testid="logo" style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}
