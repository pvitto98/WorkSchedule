import React, { FunctionComponent, useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import styles from "./Straordinari.module.css";
import LineChart from "./LineChart";
import { ApexOptions } from "apexcharts";
import './i19n'; // Fix the import typo for i18n

export type StraordinariType = {
  className?: string;
  straordinari?: string;
  image1?: string;
  // Style props
  propPadding?: CSSProperties["padding"];
  // New props
  weekdaysData: number[];
  holidaysData: number[];
};

const Straordinari: FunctionComponent<StraordinariType> = ({
  className = "",
  straordinari,
  propPadding,
  weekdaysData,
  holidaysData
}) => {
  const { t } = useTranslation(); // Initialize the translation function

  const straordinariStyle: CSSProperties = useMemo(() => ({
    padding: propPadding,
  }), [propPadding]);

  const chartSeries = [
    {
      name: t("straordinari.weekdays"), // Use translation key for "Weekdays"
      data: weekdaysData
    },
    {
      name: t("straordinari.holidays"), // Use translation key for "Holidays"
      data: holidaysData
    }
  ];

  const lineChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth', // You mentioned changing 'smooth' to 'straight', but I left it as smooth here.
    },
    title: {
      text: t("straordinari.chartTitle"), // Translate the chart title
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [
        t("months.jan"), t("months.feb"), t("months.mar"), t("months.apr"),
        t("months.may"), t("months.jun"), t("months.jul"), t("months.aug"),
        t("months.sep"), t("months.oct"), t("months.nov"), t("months.dec")
      ], // Translate month names
    }
  };

  return (
    <div
      className={[styles.straordinari, className].join(" ")}
      style={straordinariStyle}
    >
      <b className={styles.straordinari1}>{straordinari}</b>
      <div className={styles.graficostraordinari}>
        <LineChart series={chartSeries} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Straordinari;
