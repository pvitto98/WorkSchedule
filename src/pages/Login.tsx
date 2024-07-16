import { FunctionComponent } from "react";
import EmailPasswordFields from "../components/EmailPasswordFields";
import styles from "./Login.module.css";

const Login: FunctionComponent = () => {
  return (
    <div className={styles.login}>
      <div className={styles.emailPasswordFieldsWrapper}>
        <EmailPasswordFields />
      </div>
      <img
        className={styles.immagineloginIcon}
        loading="lazy"
        alt=""
        src="/immaginelogin@2x.png"
      />
    </div>
  );
};

export default Login;
