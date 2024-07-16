import { FunctionComponent } from "react";
import styles from "./Registrazione.module.css";

const Registrazione: FunctionComponent = () => {
  return (
    <div className={styles.registrazione}>
      <section className={styles.logincontent}>
        <img
          className={styles.immagineloginIcon}
          loading="lazy"
          alt=""
          src="/immaginelogin@2x.png"
        />
        <div className={styles.credentials}>
          <div className={styles.inputcontainer}>
            <form className={styles.registrati}>
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
                      type="text"
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
              <div className={styles.rememberMe}>
                <div className={styles.rememberMe1}>
                  <div className={styles.switchbase}>
                    <div className={styles.toggleCircle} />
                  </div>
                  <div className={styles.ricordami}>Ricordami</div>
                </div>
              </div>
              <button className={styles.buttonbase}>
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
                  <span className={styles.accedi1}>Accedi</span>
                </b>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registrazione;
