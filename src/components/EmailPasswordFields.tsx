import { FunctionComponent } from "react";
import "antd/dist/antd.min.css";
import { Switch } from "antd";
import styles from "./EmailPasswordFields.module.css";

export type EmailPasswordFieldsType = {
  className?: string;
};

const EmailPasswordFields: FunctionComponent<EmailPasswordFieldsType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.emailPasswordFields, className].join(" ")}>
      <div className={styles.benRitornatoParent}>
        <h1 className={styles.benRitornato}>Ben Ritornato</h1>
        <div className={styles.inserisciLaMailELaPassworWrapper}>
          <b className={styles.inserisciLaMail}>
            Inserisci la mail e la password per accedere
          </b>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.emailWrapper}>
          <div className={styles.email}>Email</div>
        </div>
        <div className={styles.email1}>
          <input
            className={styles.laTuaEmail}
            placeholder="La tua email"
            type="text"
          />
          <img
            className={styles.passwordTextIcon}
            alt=""
            src="/password-text.svg"
          />
          <div className={styles.minwidth}>
            <div className={styles.content} />
          </div>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.passwordWrapper}>
          <div className={styles.password}>Password</div>
        </div>
        <div className={styles.email2}>
          <div className={styles.laTuaPassword}>La tua password</div>
          <img
            className={styles.passwordTextIcon1}
            alt=""
            src="/password-text1.svg"
          />
          <div className={styles.minwidth1}>
            <div className={styles.content1} />
          </div>
        </div>
      </div>
      <div className={styles.switchbaseParent}>
        <div className={styles.switchbase}>
          <div className={styles.switchbaseChild} />
        </div>
        <div className={styles.ricordami}>Ricordami</div>
      </div>
      <button className={styles.accedi}>
        <div className={styles.widthStructure}>
          <div className={styles.heightStructure}>
            <div className={styles.buttonBody}>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
              <b className={styles.text}>Accedi</b>
              <div className={styles.icon1}>
                <div className={styles.div1}></div>
              </div>
            </div>
          </div>
          <div className={styles.minwidth2}>
            <div className={styles.content2} />
          </div>
        </div>
      </button>
      <div className={styles.nonHaiUnContainer}>
        <span>
          <span>Non hai un account?</span>
          <b className={styles.b}>{` `}</b>
        </span>
        <b className={styles.registrati}>
          <span>Registrati</span>
        </b>
      </div>
    </div>
  );
};

export default EmailPasswordFields;
