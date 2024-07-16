import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Valore1.module.css";

export type Valore1Type = {
  className?: string;
  immagine?: string;

  /** Style props */
  propGap?: CSSProperties["gap"];
};

const Valore1: FunctionComponent<Valore1Type> = ({
  className = "",
  immagine,
  propGap,
}) => {
  const valoreStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  return (
    <div className={[styles.valore, className].join(" ")} style={valoreStyle}>
      <div className={styles.valorecontent}>
        <b className={styles.ferie}>Ferie</b>
        <div className={styles.value}>
          <b className={styles.dots}>2,300</b>
        </div>
      </div>
      <img className={styles.immagineIcon} alt="" src={immagine} />
    </div>
  );
};

export default Valore1;
