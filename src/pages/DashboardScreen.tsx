import { FunctionComponent } from "react";
import Sidebar from "../components/Sidebar";
import AnalyticsCards1 from "../components/AnalyticsCards1";
import AnalyticsCards from "../components/AnalyticsCards";
import styles from "./DashboardScreen.module.css";

const DashboardScreen: FunctionComponent = () => {
  return (
    <div className={styles.dashboardScreen}>
      <Sidebar />
      <main className={styles.breadcrumbParent}>
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
              <b className={styles.nomeCognome}>Nome Cognome</b>
            </div>
          </div>
        </div>
        <AnalyticsCards1 />
        <AnalyticsCards />
      </main>
    </div>
  );
};

export default DashboardScreen;
