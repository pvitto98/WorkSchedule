import React, { FunctionComponent, useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Straordinari.module.css";
import LineChart from "./LineChart";
import { ApexOptions } from "apexcharts";
import './i19n';

export type FerieType = {
  className?: string;
  ferie?: string;
  // Style props
  propPadding?: CSSProperties["padding"];
  // New props
  ferieData: number[];
};

const Ferie: FunctionComponent<FerieType> = ({
  className = "",
  ferie,
  propPadding,
  ferieData
}) => {
  const { t } = useTranslation();

  const ferieStyle: CSSProperties = useMemo(() => ({
    padding: propPadding,
  }), [propPadding]);

  const chartSeries = [
    {
      name: t("ferie.label"),
      data: ferieData
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
      curve: 'straight',
      width: 2,
      dashArray: 5,
    },
    title: {
      text: t("ferie.chartTitle"),
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f7f7f7', 'transparent'],
        opacity: 0.5
      },
    },
    markers: {
      size: 5,
      colors: ['#FF4560'],
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    xaxis: {
      categories: [
        t("months.jan"), t("months.feb"), t("months.mar"), t("months.apr"),
        t("months.may"), t("months.jun"), t("months.jul"), t("months.aug"),
        t("months.sep"), t("months.oct"), t("months.nov"), t("months.dec")
      ],
    }
  };

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
