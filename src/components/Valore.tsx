import { FunctionComponent } from "react";
import styles from "./Valore.module.css";

export type ValoreType = {
  className?: string;
  ferie?: string;
  immagine?: string;
  value?: String;
};

const Valore: FunctionComponent<ValoreType> = ({
  className = "",
  ferie,
  immagine,
  value
}) => {
  return (
    <div className={[styles.valore, className].join(" ")}>
      <div className={styles.valorecontent}>
        <b className={styles.ferie}>{ferie}</b>
        <b className={styles.value}>{value}</b>
      </div>
      <img className={styles.immagineIcon} alt="" src={immagine} />
    </div>
  );
};

export default Valore;
