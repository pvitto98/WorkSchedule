import React, { FunctionComponent, useState, useContext } from "react";
import styles from "./Registrazione.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext"; // Assume UserContext is set up in a higher-level component
import { BASE_URL } from '../config';
import Spinner from "../components/Spinner";

const Registrazione: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleRegister = async () => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      const { token, userId } = response.data;

      console.log("Registration successful:", response.data);
      setUser({
        name, email,
        userId: userId
      }); 
      // Update the user context
      navigate("/"); // Optionally, redirect to the login page or home page
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure (show error message, etc.)
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className={styles.registrazione}>
          {loading && <Spinner />} {/* Conditionally render the spinner */}

      <section className={styles.logincontent}>
        <img
          className={styles.immagineloginIcon}
          loading="lazy"
          alt=""
          src="/immaginelogin@2x.png"
        />
        <div className={styles.credentials}>
          <div className={styles.inputcontainer}>
            <div className={styles.registrati}>
              <div className={styles.registrationOptions}>
                <div className={styles.registerWith}>
                  <div className={styles.title}>
                    <h1 className={styles.registrati1}>Registrati</h1>
                  </div>
                </div>
              </div>
              <div className={styles.name}>
                <div className={styles.inputRows}>
                  <div className={styles.nome}>Nome</div>
                </div>
                <div className={styles.name1}>
                  <div className={styles.inputfieldtext}>
                    <input
                      className={styles.inserisciIlTuo}
                      placeholder="Inserisci il tuo nome"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <img
                      className={styles.passwordTextIcon}
                      alt=""
                      src="/password-text1.svg"
                    />
                    <div className={styles.minwidth}>
                      <div className={styles.content} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.email}>
                <div className={styles.emailWrapper}>
                  <div className={styles.email1}>Email</div>
                </div>
                <div className={styles.email2}>
                  <div className={styles.inputfieldtext1}>
                    <input
                      className={styles.inserisciLaTua}
                      placeholder="Inserisci la tua email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
              </div>
              <div className={styles.password}>
                <div className={styles.passwordWrapper}>
                  <div className={styles.password1}>Password</div>
                </div>
                <div className={styles.email3}>
                  <div className={styles.inputfieldtext2}>
                    <input
                      className={styles.inserisciLaTua1}
                      placeholder="Inserisci la tua password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      className={styles.passwordTextIcon2}
                      alt=""
                      src="/password-text1.svg"
                    />
                    <div className={styles.minwidth2}>
                      <div className={styles.content2} />
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.buttonbase} onClick={handleRegister}>
                <div className={styles.widthStructure}>
                  <div className={styles.heightStructure}>
                    <div className={styles.buttonBody}>
                      <div className={styles.icon}>
                        <div className={styles.div}></div>
                      </div>
                      <b className={styles.text}>Registrati</b>
                      <div className={styles.icon1}>
                        <div className={styles.div1}></div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.minwidth3}>
                    <div className={styles.content3} />
                  </div>
                </div>
              </button>
              <div className={styles.haiGiaUnContainer}>
                <span className={styles.haiGiaUnAccount}>
                  <span className={styles.haiGiaUn}>Hai gia’ un account?</span>
                  <b className={styles.b}>{` `}</b>
                </span>
                <b className={styles.accedi}>
                  <Link to="/login"><span className={styles.accedi1}>Accedi</span></Link>
                </b>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registrazione;
