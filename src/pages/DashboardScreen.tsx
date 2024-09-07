import { FunctionComponent } from "react";
import RiepilogoMensile from "../components/RiepilogoMensile";
import RiepilogoAnnuale from "../components/RiepilogoAnnuale";
import styles from "./DashboardScreen.module.css";

const DashboardScreen: FunctionComponent = () => {
  return (
    <div className={styles.dashboardScreen}>
      <RiepilogoMensile />
      <RiepilogoAnnuale />
    </div>
  );
};

export default DashboardScreen;
