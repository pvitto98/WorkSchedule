import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const useYearlyData = (userId: string | undefined, t: any) => {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [availableYears, setAvailableYears] = useState<string[]>([selectedYear]);
  const [yearlyData, setYearlyData] = useState({
    ferie: 0,
    straordinariFeriali: 0,
    straordinariFestivi: 0,
    vectorFerie: [],
    vectorFeriali: [],
    vectorFestivi: [],
    permessi: 0,
  });

  const fetchAvailableYears = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`);
      if (response.status === 200) {
        const years = response.data.years.sort((a: number, b: number) => b - a);
        setAvailableYears(years);
        setSelectedYear(years[0]);
      }
    } catch (error) {
      console.error(t("fetchYearsError"), error);
    }
  }, [userId, t]);

  const fetchYearlyData = useCallback(async () => {
    if (!userId) return;
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
        permessi: data.permessi || 0,
      });
    } catch (error) {
      console.error(t("fetchYearlyDataError"), error);
    }
  }, [userId, selectedYear, t]);

  useEffect(() => {
    fetchAvailableYears();
  }, [fetchAvailableYears]);

  useEffect(() => {
    fetchYearlyData();
  }, [fetchYearlyData]);

  return {
    selectedYear,
    setSelectedYear,
    availableYears,
    yearlyData,
  };
};
