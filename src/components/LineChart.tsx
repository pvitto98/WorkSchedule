import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styles from "./LineChart.module.css"; // Import CSS module

interface LineChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

const LineChart: React.FC<LineChartProps> = ({ series, options }) => {
  return (
    <div className={styles.chartContainer}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
        width="100%"
        className={styles.chart}
      />
    </div>
  );
};

export default LineChart;
