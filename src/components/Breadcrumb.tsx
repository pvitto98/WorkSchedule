import React, { FunctionComponent, useContext } from "react";
import styles from "./Breadcrumb.module.css";
import { UserContext } from "../UserContext"; // Assume UserContext is set up in a higher-level component

const Breadcrumb: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbItem}>
        <div className={styles.breadcrumbitemprevious}>
          <div className={styles.breadcrumb1}>
            <span>{`Pages `}</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.dashboard}>/ Dashboard</span>
          </div>
        </div>
        <b className={styles.dashboard1}>Dashboard</b>
      </div>
      <div className={styles.userProfile}>
        <div className={styles.listitemdefault}>
          <img
            className={styles.ioniconppersondefault}
            loading="lazy"
            alt=""
            src="/ioniconppersondefault.svg"
          />
          <b className={styles.nomeCognome}>{user.name}</b>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
