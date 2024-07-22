import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import Valore from "./Valore";
import styles from "./AnalyticsCards1.module.css";
import axios from "axios"; // Import axios for HTTP requests
import { UserContext } from "../UserContext"; // Assume UserContext is set up in a higher-level component
import { BASE_URL } from '../config';

export type AnalyticsCards1Type = {
  className?: string;
};

const months = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

// Helper function to get the Italian month name
const getItalianMonthName = (monthIndex: number) => {
  const monthNames = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  return monthNames[monthIndex];
};

const AnalyticsCards1: FunctionComponent<AnalyticsCards1Type> = ({
  className = "",
}) => {
  const { user } = useContext(UserContext);
  const currentMonthIndex = new Date().getMonth();
  const currentItalianMonthName = getItalianMonthName(currentMonthIndex);
  
  const [selectedMonth, setSelectedMonth] = useState(currentItalianMonthName);  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [monthlyData, setMonthlyData] = useState({
    ferie: 0,
    straordinariFeriali: 0,
    straordinariFestivi: 0,
  });

  const [availableYears, setAvailableYears] = useState<string[]>([new Date().getFullYear().toString()]);


  const fetchMonthlyData = async (month: string, year: string) => {
    try {
      console.log('request for ' + month + ' ' + year);
      const userId = user.userId; // Assume user is defined somewhere in your component
      const monthIndex = months.indexOf(month) + 1; // Convert month name to month index
      const response = await axios.get(`${BASE_URL}/api/monthlyaggregates/${userId}/${year}/${monthIndex}`);
  
      if (response.status === 200) {
        console.log(response.data);
        setMonthlyData(response.data);
      } else if (response.status === 404) {
        // Handle no data found
        setMonthlyData({
          ferie: -1,
          straordinariFeriali: -1,
          straordinariFestivi: -1,
        });
      }
    } catch (error) {
      console.error("Failed to fetch monthly data", error);
      // Handle server error by setting all values to "x"
      setMonthlyData({
        ferie: -1,
        straordinariFeriali: -1,
        straordinariFestivi: -1,
      });
    }
  };

    // Fetch available years for the user
    const fetchAvailableYears = async () => {
      try {
        const userId = user.userId;
        const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`); // Correct endpoint
        if (response.status === 200) {
          setAvailableYears(response.data.years);
          // Set the selected year to the most recent year by default
          setSelectedYear(response.data.years[0]);
        }
      } catch (error) {
        console.error("Failed to fetch available years", error);
      }
    };

  useEffect(() => {
    fetchMonthlyData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  
  // Fetch available years on mount
  useEffect(() => {
    if (user.userId) {
      fetchAvailableYears();
    }
  }, [user.userId]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setIsYearDropdownOpen(false);
  };

  

  return (
    <section className={[styles.analyticsCards, className].join(" ")}>
      <div className={styles.monthSelector}>
        <b className={styles.selectedDate}>{`${selectedMonth} ${selectedYear}`}</b>
        <b
          className={styles.cambiaMese}
          onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
        >
          Cambia mese
        </b>
        {isMonthDropdownOpen && (
          <select
            className={styles.monthDropdown}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        )}
        <b
          className={styles.cambiaMese}
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
      <nav className={styles.monthData}>
        <Valore
          ferie="Ferie"
          immagine="/immagine-1@2x.png"
          propGap="unset"
          value={`${monthlyData.ferie}`}
        />
        <Valore
          ferie="Straordinari Feriali"
          immagine="/immagine-1@2x.png"
          propGap="unset"
          value={`${Math.floor(monthlyData.straordinariFeriali / 60)}h ${monthlyData.straordinariFeriali % 60}m`}
          />
        <Valore
          ferie="Straordinari Festivi"
          immagine="/immagine-2@2x.png"
          propGap="unset"
          value={`${Math.floor(monthlyData.straordinariFestivi / 60)}h ${monthlyData.straordinariFestivi % 60}m`}
          />
      </nav>
    </section>
  );
};

export default AnalyticsCards1;
