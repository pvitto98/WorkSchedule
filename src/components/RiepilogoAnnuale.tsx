import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import Valore from "./Valore";
import Straordinari from "./Straordinari";
import styles from "./RiepilogoAnnuale.module.css";
import { UserContext } from "../UserContext";
import axios from "axios";
import Ferie from "./Ferie";
import { BASE_URL } from '../config';
import { motion } from "framer-motion";

export type RiepilogoAnnualeType = {
  className?: string;
};

const RiepilogoAnnuale: FunctionComponent<RiepilogoAnnualeType> = ({
  className = "",
}) => {
  const { user } = useContext(UserContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const userId = user.userId;
  const [availableYears, setAvailableYears] = useState<string[]>([new Date().getFullYear().toString()]);

  const [yearlyData, setYearlyData] = useState({
    ferie: 0,
    straordinariFeriali: 0,
    straordinariFestivi: 0,
    vectorFerie: [],
    vectorFeriali: [],
    vectorFestivi: [],
    permessi: 0
  });

  // Fetch available years for the user
  const fetchAvailableYears = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`);
      if (response.status === 200) {
        const years = response.data.years.sort((a: number, b: number) => b - a);
        setAvailableYears(years);
        setSelectedYear(years[0]);
      }
    } catch (error) {
      console.error("Failed to fetch available years", error);
    }
  };

  const fetchYearlyData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/yearlyaggregates/${userId}/${selectedYear}`);
      const data = response.data;

      const totalStraordinarioFestivo = data.straordinariFestivi.reduce((sum: number, value: number) => sum + value, 0);
      const totalStraordinarioFeriale = data.straordinariFeriali.reduce((sum: number, value: number) => sum + value, 0);
      const totalFerie = data.ferie.reduce((sum: number, value: number) => sum + value, 0);

      setYearlyData({
        ferie: totalFerie || 0,
        straordinariFeriali: totalStraordinarioFeriale,
        straordinariFestivi: totalStraordinarioFestivo,
        vectorFerie: data.ferie,
        vectorFeriali: data.straordinariFeriali,
        vectorFestivi: data.straordinariFestivi,
        permessi: data.permessi || 0
      });
    } catch (error) {
      console.error("Error fetching yearly aggregates:", error);
    }
  };

  useEffect(() => {
    if (user.userId) {
      fetchAvailableYears();
    }
  }, [user.userId]);

  useEffect(() => {
    if (user.userId) {
      fetchYearlyData();
    }
  }, [user.userId, selectedYear]);

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
        <b className={styles.selectedYear}>{`Riassunto Annuale`}</b>
        <motion.select
          className={styles.yearDropdown}
          value={selectedYear}
          onChange={handleYearChange}        >
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
        <b className={styles.riassunto}>Riassunto</b>
        <motion.div
          className={styles.yearDataContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Valore
            ferie="Ferie"
            immagine="/immagine-1@2x.png"
            propGap="unset"
            value={`${yearlyData.ferie}`}
          />
          <Valore
            ferie="Straordinari Feriali"
            immagine="/immagine-4@2x.png"
            propGap="20px"
            value={formatTime(yearlyData.straordinariFeriali)}
          />
          <Valore
            ferie="Straordinari Festivi"
            immagine="/immagine-5@2x.png"
            propGap="20px"
            value={formatTime(yearlyData.straordinariFestivi)}
          />
          <Valore
            ferie="Permessi"
            immagine="/immagine-6@2x.png"
            value={formatTime(yearlyData.permessi)}
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
          straordinari="Straordinari"
          ferialiData={yearlyData.vectorFeriali}
          festiviData={yearlyData.vectorFestivi}
        />
        <Ferie
          ferie="Ferie"
          ferieData={yearlyData.vectorFerie}
        />
      </motion.div>
    </motion.section>
  );
};

export default RiepilogoAnnuale;
