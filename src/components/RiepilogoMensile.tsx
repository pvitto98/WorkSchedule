import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Valore from "./Valore";
import styles from "./RiepilogoMensile.module.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import { BASE_URL } from '../config';
import './i19n';

export type RiepilogoMensileType = {
  className?: string;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthName = (monthIndex: number, t: any) => {
  return t(`monthNames.${months[monthIndex]}`);
};

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${Math.floor(mins)}m`;
};

const RiepilogoMensile: FunctionComponent<RiepilogoMensileType> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const currentMonthIndex = new Date().getMonth();

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [monthlyData, setMonthlyData] = useState({
    ferie: 0,
    malattia: 0,
    straordinariFeriali: 0,
    straordinariFestivi: 0,
  });

  const [availableYears, setAvailableYears] = useState<string[]>([new Date().getFullYear().toString()]);

  const fetchMonthlyData = async (monthIndex: number, year: string) => {
    try {
      const userId = user.userId;
      const response = await axios.get(`${BASE_URL}/api/monthlyaggregates/${userId}/${year}/${monthIndex + 1}`);

      if (response.status === 200) {
        setMonthlyData(response.data);
      } else if (response.status === 404) {
        setMonthlyData({
          ferie: -1,
          malattia: -1,
          straordinariFeriali: -1,
          straordinariFestivi: -1,
        });
      }
    } catch (error) {
      console.error(t("fetchDataError"), error);
      setMonthlyData({
        ferie: -1,
        malattia: -1,
        straordinariFeriali: -1,
        straordinariFestivi: -1,
      });
    }
  };

  const fetchAvailableYears = async () => {
    try {
      const userId = user.userId;
      const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`);
      if (response.status === 200) {
        const years = response.data.years.sort((a: number, b: number) => b - a);
        setAvailableYears(years);
        if (years.length > 0) {
          setSelectedYear(years[0]);
        }
      }
    } catch (error) {
      console.error(t("fetchYearsError"), error);
    }
  };

  useEffect(() => {
    fetchMonthlyData(selectedMonthIndex, selectedYear);
  }, [selectedMonthIndex, selectedYear]);

  useEffect(() => {
    if (user.userId) {
      fetchAvailableYears();
    }
  }, [user.userId]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonthIndex(Number(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <motion.section
      className={[styles.RiepilogoAnnuale, className].join(" ")}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={styles.dateSelector}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <b className={styles.selectedDate}>{t("monthlySummary")}</b>
        <div className={styles.dropdownContainer}>
          <motion.select
            className={styles.monthDropdown}
            value={selectedMonthIndex}
            onChange={handleMonthChange}
          >
            {months.map((_, index) => (
              <option key={index} value={index}>
                {t(`monthNames.${months[index]}`)}
              </option>
            ))}
          </motion.select>
          <motion.select
            className={styles.yearDropdown}
            value={selectedYear}
            onChange={handleYearChange}
            transition={{ duration: 0.3 }}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </motion.select>
        </div>
      </motion.div>
      <motion.nav
        className={styles.monthData}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Valore
          ferie={t("overtimeWeekdays")}
          immagine="/immagine-1@2x.png"
          propGap="unset"
          value={formatTime(monthlyData.straordinariFeriali)}
        />
        <Valore
          ferie={t("overtimeHolidays")}
          immagine="/immagine-2@2x.png"
          propGap="unset"
          value={formatTime(monthlyData.straordinariFestivi)}
        />
        <Valore
          ferie={t("vacation")}
          immagine="/immagine-1@2x.png"
          propGap="unset"
          value={`${monthlyData.ferie}`}
        />
        <Valore
          ferie={t("sickLeave")}
          immagine="/immagine-1@2x.png"
          propGap="unset"
          value={`${monthlyData.malattia}`}
        />
      </motion.nav>
    </motion.section>
  );
};


export default RiepilogoMensile;
