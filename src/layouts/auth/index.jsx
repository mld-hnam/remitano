import { Col, Row } from "antd";
import React from "react";
// import { ReactComponent as Logo } from "@/assets/images/logo-full.svg";
import styles from "./style.less";

export default function AuthLayout({ children }) {
  return (
    <Row justify="center" align="middle" className={styles.root}>
      <Col>
        <div className={styles.container}>
          {/* <div className={styles.logo}>
            <Logo />
          </div> */}
          <div className={styles.children}>{children}</div>
        </div>
      </Col>
    </Row>
  );
}
