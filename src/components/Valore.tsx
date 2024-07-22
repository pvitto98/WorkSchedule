import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Valore.module.css";

export type ValoreType = {
  className?: string;
  ferie?: string;
  immagine?: string;
  value?: String;
  /** Style props */
  propGap?: CSSProperties["gap"];
};

const Valore: FunctionComponent<ValoreType> = ({
  className = "",
  ferie,
  immagine,
  propGap,
  value
}) => {
  const valore1Style: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  return (
    <div className={[styles.valore, className].join(" ")} style={valore1Style}>
      <div className={styles.valorecontent}>
        <b className={styles.ferie}>{ferie}</b>
        <b className={styles.value}>{value}</b>
      </div>
      <img className={styles.immagineIcon} alt="" src={immagine} />
    </div>
  );
};

export default Valore;
