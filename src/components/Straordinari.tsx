import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Straordinari.module.css";

export type StraordinariType = {
  className?: string;
  straordinari?: string;
  image1?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
};

const Straordinari: FunctionComponent<StraordinariType> = ({
  className = "",
  straordinari,
  image1,
  propPadding,
}) => {
  const straordinariStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div
      className={[styles.straordinari, className].join(" ")}
      style={straordinariStyle}
    >
      <b className={styles.straordinari1}>{straordinari}</b>
      <div className={styles.graficostraordinari}>
        <img className={styles.image1Icon} alt="" src={image1} />
      </div>
    </div>
  );
};

export default Straordinari;
