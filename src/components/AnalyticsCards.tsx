import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import Valore from "./Valore";
import Straordinari from "./Straordinari";
import styles from "./AnalyticsCards.module.css";
import { UserContext } from "../UserContext"; // Assume UserContext is set up in a higher-level component
import axios from "axios";
import Ferie from "./Ferie";
import { BASE_URL } from '../config';

export type AnalyticsCardsType = {
  className?: string;
};

const years = ["2023", "2024", "2025", "2026", "2027"];

const AnalyticsCards: FunctionComponent<AnalyticsCardsType> = ({
  className = "",
}) => {
  const { user } = useContext(UserContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
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
      const userId = user.userId;
      const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`); // Correct endpoint
      if (response.status === 200) {
        const years = response.data.years.sort((a: number, b: number) => b - a)
        setAvailableYears(years);
        // Set the selected year to the most recent year by default
        setSelectedYear(years[0]);
      }
    } catch (error) {
      console.error("Failed to fetch available years", error);
    }
  };

  const fetchYearlyData = async () => {
    try {
      console.log("fetchYearlyData anno: " + selectedYear )
      const response = await axios.get(`${BASE_URL}/api/yearlyaggregates/${userId}/${selectedYear}`);
      const data = response.data;

      // Sum the straordinario values for each month
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

  // Fetch available years on mount
  useEffect(() => {
    if (user.userId) {
      fetchYearlyData();
    }
  }, [user.userId , selectedYear]);

  useEffect(() => {
    if (userId) {
      fetchAvailableYears();
    }
  }, [userId]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setIsYearDropdownOpen(false);
  };

  // Helper function to format minutes as hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${Math.floor(mins)}m`;
  };

  return (
    <section className={[styles.analyticsCards, className].join(" ")}>
      <div className={styles.yearSelector}>
        <b className={styles.selectedYear}>{`Anno ${selectedYear}`}</b>
        <b
          className={styles.cambiaAnno}
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
        >
          Cambia anno
        </b>
        {isYearDropdownOpen && (
          <select
            className={styles.yearDropdown}
            value={selectedYear}
            onChange={handleYearChange}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.yearSummary}>
        <b className={styles.riassunto}>Riassunto</b>
        <div className={styles.yearDataContainer}>
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
        </div>
      </div>
      <div className={styles.graficiaggregati}>
        <Straordinari
          straordinari="Straordinari"
          ferialiData={yearlyData.vectorFeriali}
          festiviData={yearlyData.vectorFestivi}
        />
        <Ferie
          ferie="Ferie"
          ferieData={yearlyData.vectorFerie} // Pass the vectorFerie data
        />

      </div>
    </section>
  );
};

export default AnalyticsCards;
