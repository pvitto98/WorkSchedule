import { FunctionComponent } from "react";
import AnalyticsCards1 from "../components/AnalyticsCards1";
import AnalyticsCards from "../components/AnalyticsCards";
import styles from "./DashboardScreen.module.css";

const DashboardScreen: FunctionComponent = () => {
  return (
    <div className={styles.dashboardScreen}>
      <AnalyticsCards1 />
      <AnalyticsCards />
    </div>
  );
};

export default DashboardScreen;
