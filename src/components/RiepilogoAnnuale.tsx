import React, { FunctionComponent, useContext } from "react";
import Valore from "./Valore";
import Straordinari from "./Straordinari";
import styles from "./RiepilogoAnnuale.module.css";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useYearlyData } from "./useYearlyData";
import Ferie from "./Ferie";

export type RiepilogoAnnualeType = {
  className?: string;
};

const RiepilogoAnnuale: FunctionComponent<RiepilogoAnnualeType> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { selectedYear, setSelectedYear, availableYears, yearlyData } = useYearlyData(user.userId, t);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${Math.floor(mins)}m`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[styles.RiepilogoAnnuale, className].join(" ")}
    >
      <motion.div
        className={styles.yearSelector}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <b className={styles.selectedYear}>{t("annualSummary")}</b>
        <motion.select
          className={styles.yearDropdown}
          value={selectedYear}
          onChange={handleYearChange}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </motion.select>
      </motion.div>
      <motion.div
        className={styles.yearSummary}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <b className={styles.riassunto}>{t("summary")}</b>
        <motion.div
          className={styles.yearDataContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Valore
            ferie={t("overtimeWeekdays")}
            immagine="/immagine-4@2x.png"
            value={formatTime(yearlyData.straordinariFeriali)}
          />
          <Valore
            ferie={t("overtimeHolidays")}
            immagine="/immagine-5@2x.png"
            value={formatTime(yearlyData.straordinariFestivi)}
          />
          <Valore
            ferie={t("permissions")}
            immagine="/immagine-6@2x.png"
            value={formatTime(yearlyData.permessi)}
          />
          <Valore
            ferie={t("vacation")}
            immagine="/immagine-1@2x.png"
            value={`${yearlyData.ferie}`}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.graficiaggregati}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Straordinari
          straordinari={t("overtime")}
          weekdaysData={yearlyData.vectorFeriali}
          holidaysData={yearlyData.vectorFestivi}
        />
        <Ferie ferie={t("vacation")} ferieData={yearlyData.vectorFerie} />
      </motion.div>
    </motion.section>
  );
};

export default RiepilogoAnnuale;
