import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useMonthlyData = (userId: string | undefined, BASE_URL: string, t: any) => {
  const [monthlyData, setMonthlyData] = useState({
    ferie: 0,
    malattia: 0,
    straordinariFeriali: 0,
    straordinariFestivi: 0,
  });
  const [availableYears, setAvailableYears] = useState<string[]>([new Date().getFullYear().toString()]);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthlyData = useCallback(
    async (monthIndex: number, year: string) => {
      if (!userId) return;
      try {
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
        setError(t("fetchDataError"));
      }
    },
    [userId, BASE_URL, t]
  );

  const fetchAvailableYears = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/availableYears/${userId}`);
      if (response.status === 200) {
        const years = response.data.years.sort((a: number, b: number) => b - a);
        setAvailableYears(years);
      }
    } catch (error) {
      console.error(t("fetchYearsError"), error);
      setError(t("fetchYearsError"));
    }
  }, [userId, BASE_URL, t]);

  useEffect(() => {
    if (userId) fetchAvailableYears();
  }, [userId, fetchAvailableYears]);

  return {
    monthlyData,
    availableYears,
    fetchMonthlyData,
    error,
  };
};
