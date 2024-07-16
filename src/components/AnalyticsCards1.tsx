import { FunctionComponent } from "react";
import Valore1 from "./Valore1";
import Valore from "./Valore";
import styles from "./AnalyticsCards1.module.css";

export type AnalyticsCards1Type = {
  className?: string;
};

const AnalyticsCards1: FunctionComponent<AnalyticsCards1Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.analyticsCards, className].join(" ")}>
      <div className={styles.monthSelector}>
        <b className={styles.febbraio2024}>Febbraio 2024</b>
        <b className={styles.cambiaMese}>Cambia mese</b>
      </div>
      <nav className={styles.monthData}>
        <Valore1 immagine="/immagine@2x.png" />
        <Valore
          ferie="Straordinari Feriali"
          immagine="/immagine-1@2x.png"
          propGap="unset"
        />
        <Valore
          ferie="Straordinari Festivi"
          immagine="/immagine-2@2x.png"
          propGap="unset"
        />
      </nav>
    </section>
  );
};

export default AnalyticsCards1;
