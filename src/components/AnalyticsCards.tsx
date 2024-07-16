import { FunctionComponent } from "react";
import Valore1 from "./Valore1";
import Valore from "./Valore";
import Straordinari from "./Straordinari";
import styles from "./AnalyticsCards.module.css";

export type AnalyticsCardsType = {
  className?: string;
};

const AnalyticsCards: FunctionComponent<AnalyticsCardsType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.analyticsCards, className].join(" ")}>
      <div className={styles.yearSelector}>
        <b className={styles.anno2024}>Anno 2024</b>
        <b className={styles.cambiaAnno}>Cambia anno</b>
      </div>
      <div className={styles.yearSummary}>
        <b className={styles.riassunto}>Riassunto</b>
        <div className={styles.yearDataContainer}>
          <Valore1 immagine="/immagine-3@2x.png" propGap="20px" />
          <Valore
            ferie="Straordinari Feriali"
            immagine="/immagine-4@2x.png"
            propGap="20px"
          />
          <Valore
            ferie="Straordinari Festivi"
            immagine="/immagine-5@2x.png"
            propGap="20px"
          />
          <Valore ferie="Permessi" immagine="/immagine-6@2x.png" />
        </div>
      </div>
      <div className={styles.graficiaggregati}>
        <Straordinari straordinari="Straordinari" image1="/image-1@2x.png" />
        <Straordinari
          straordinari="Ferie"
          image1="/image-1-1@2x.png"
          propPadding="0px 0px 1.7px"
        />
      </div>
    </section>
  );
};

export default AnalyticsCards;
