import { ReactComponent as Logo } from "@/assets/images/logo-full-colored.svg";
import React from "react";
import maintenance from "@/assets/images/maintenance.jpg";
import styles from "./style.less";
import { useNavigate } from "react-router";

export default function DefaultError({ title, content, actions }) {
  const navigate = useNavigate();

  return (
    <div className={styles.root} role="alert">
      <div className={styles.maintenance}>
        <img src={maintenance} alt="maintenance" />
      </div>
      <div className={styles.message}>
        <div className={styles.title}>{title}</div>
        {content && <div className={styles.content}>{content}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}
