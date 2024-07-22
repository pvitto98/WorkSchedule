import React, { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Straordinari.module.css";
import LineChart from "./LineChart";
import { ApexOptions } from "apexcharts";

export type FerieType = {
  className?: string;
  ferie?: string;
  // Style props
  propPadding?: CSSProperties["padding"];
  // New props
  ferieData: number[];
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
    curve: 'straight', // Changed from 'smooth' to 'straight'
    width: 2, // Adjusted stroke width
    dashArray: 5, // Creates a dashed line effect
  },
  title: {
    text: 'Ferie Trends',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f7f7f7', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 5, // Added marker size
    colors: ['#FF4560'], // Marker color
    strokeColors: '#fff', // Marker stroke color
    strokeWidth: 2, // Marker stroke width
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
};

const Ferie: FunctionComponent<FerieType> = ({
  className = "",
  ferie,
  propPadding,
  ferieData
}) => {
  const ferieStyle: CSSProperties = useMemo(() => ({
    padding: propPadding,
  }), [propPadding]);

  const chartSeries = [
    {
      name: "Ferie",
      data: ferieData
    }
  ];

  return (
    <div
      className={[styles.straordinari, className].join(" ")}
      style={ferieStyle}
    >
      <b className={styles.straordinari1}>{ferie}</b>
      <div className={styles.graficostraordinari}>
        <LineChart series={chartSeries} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Ferie;
