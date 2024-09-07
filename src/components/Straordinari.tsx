import React, { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Straordinari.module.css";
import LineChart from "./LineChart";
import { ApexOptions } from "apexcharts";

export type StraordinariType = {
  className?: string;
  straordinari?: string;
  image1?: string;
  // Style props
  propPadding?: CSSProperties["padding"];
  // New props
  ferialiData: number[];
  festiviData: number[];
};

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
    curve: 'smooth', // Changed from 'smooth' to 'straight'
  },
  title: {
    text: 'Distribuzione dei Straordinari',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
};

const Straordinari: FunctionComponent<StraordinariType> = ({
  className = "",
  straordinari,
  propPadding,
  ferialiData,
  festiviData
}) => {
  const straordinariStyle: CSSProperties = useMemo(() => ({
    padding: propPadding,
  }), [propPadding]);

  const chartSeries = [
    {
      name: "Feriali",
      data: ferialiData
    },
    {
      name: "Festivi",
      data: festiviData
    }
  ];

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
