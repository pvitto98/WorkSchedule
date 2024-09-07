import { FunctionComponent, useContext, useState } from "react";
import { useTranslation } from 'react-i18next';

import "antd/dist/antd.min.css";
import { Switch } from "antd";
import styles from "./EmailPasswordFields.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../UserContext";
import { BASE_URL } from '../config';
import Spinner from "./Spinner";
import './i19n';  // This line should be added to ensure i18n configuration is loaded


export type EmailPasswordFieldsType = {
  className?: string;
};

const EmailPasswordFields: FunctionComponent<EmailPasswordFieldsType> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [feedbackMessage, setFeedbackMessage] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      }, { withCredentials: true });
      const { token, userId, name } = response.data;
      localStorage.setItem("token", token);

      // Set user context with name, email, and userId
      setUser({ name, email, userId });

      // Redirect to the desired page after login
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setFeedbackMessage(t('errorMessage', { error: error.message }));
      } else {
        setFeedbackMessage(t('unknownError'));
      }
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className={[styles.emailPasswordFields, className].join(" ")}>
      {loading && <Spinner />} {/* Conditionally render the spinner */}

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.benRitornatoParent}>
          <h1 className={styles.benRitornato}>{t('loginTitle')}</h1>
          <div className={styles.inserisciLaMailELaPassworWrapper}>
            <b className={styles.inserisciLaMail}>
              {t('loginMessage')}
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
              placeholder={t('emailPlaceholder')}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              className={styles.laTuaEmail}
              placeholder={t('passwordPlaceholder')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.minwidth1}>
              <div className={styles.content1} />
            </div>
          </div>
        </div>
        <button type="submit" className={styles.accedi}>
          <div className={styles.widthStructure}>
            <div className={styles.heightStructure}>
              <div className={styles.buttonBody}>
                <b className={styles.text}>{t('loginButton')}</b>
              </div>
            </div>
          </div>
        </button>
        <div className={styles.nonHaiUnContainer}>
          <span>
            <span>{t('noAccountText')}</span>
            <b className={styles.b}>{` `}</b>
          </span>
          <b className={styles.registrati}>
            <Link to="/registrazione"><span>{t('registerText')}</span></Link>
          </b>
        </div>
      </form>
      {/* Feedback message */}
      {feedbackMessage && <div>{feedbackMessage}</div>}
    </div>
  );
};

export default EmailPasswordFields;

