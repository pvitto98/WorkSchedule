import React, { FunctionComponent, useContext } from "react";
import styles from "./Breadcrumb.module.css";
import { UserContext } from "../UserContext"; // Assume UserContext is set up in a higher-level component
import { useLocation } from "react-router-dom";

const Breadcrumb: FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  // Determine the page name based on the current path
  const getPageName = (path: string) => {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/login':
        return 'Login';
      case '/insertdata':
        return 'Inserisci un Dato';
      case '/monthlydatascreen':
        return 'Tabella Valori';
      case '/registrazione':
        return 'Registrazione';
      default:
        return 'Home';
    }
  };
  const pageName = getPageName(location.pathname);

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
        <b className={styles.dashboard1}>{pageName}</b>
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
