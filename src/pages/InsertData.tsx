import { FunctionComponent } from "react";
import styles from "./InsertData.module.css";

const InsertData: FunctionComponent = () => {
  return (
    <div className={styles.insertdata}>
      <div className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <div className={styles.image2Wrapper}>
              <img
                className={styles.image2Icon}
                loading="lazy"
                alt=""
                src="/image-2@2x.png"
              />
            </div>
            <b className={styles.tabellaLavoro}>TABELLA LAVORO</b>
          </div>
        </div>
        <img
          className={styles.sidebarChild}
          loading="lazy"
          alt=""
          src="/vector-6.svg"
        />
        <div className={styles.menuWrapper}>
          <div className={styles.menu}>
            <div className={styles.dashboard}>
              <img
                className={styles.image4Icon}
                loading="lazy"
                alt=""
                src="/image-4@2x.png"
              />
              <div className={styles.dashboardWrapper}>
                <b className={styles.dashboard1}>Dashboard</b>
              </div>
            </div>
            <div className={styles.signUp}>
              <div className={styles.signUpIconBackground} />
              <img
                className={styles.ioniconrrocketsharp}
                loading="lazy"
                alt=""
                src="/ioniconrrocketsharp.svg"
              />
              <div className={styles.logOutWrapper}>
                <b className={styles.logOut}>Log out</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.insertform}>
        <div className={styles.breadcrumb}>
          <div className={styles.text}>
            <div className={styles.breadcrumbitemprevious}>
              <div className={styles.breadcrumb1}>
                <span>{`Pages `}</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.dashboard2}>/ Dashboard</span>
              </div>
            </div>
            <b className={styles.dashboard3}>Dashboard</b>
          </div>
          <div className={styles.menuContainer}>
            <div className={styles.menu1}>
              <div className={styles.listitemdefault}>
                <img
                  className={styles.ioniconppersondefault}
                  loading="lazy"
                  alt=""
                  src="/ioniconppersondefault.svg"
                />
                <b className={styles.nomeCognome}>Nome Cognome</b>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.insertformInner}>
          <div className={styles.inserisciUnaNuovaGiornataWrapper}>
            <h1 className={styles.inserisciUnaNuova}>
              Inserisci una nuova giornata
            </h1>
          </div>
        </div>
        <div className={styles.analyticsCards}>
          <div className={styles.febbraio2024Parent}>
            <b className={styles.febbraio2024}>Febbraio 2024</b>
            <b className={styles.cambiaMese}>Cambia mese</b>
          </div>
          <div className={styles.valoreParent}>
            <div className={styles.valore}>
              <div className={styles.valorecontent}>
                <b className={styles.ferie}>Ferie</b>
                <div className={styles.value}>
                  <b className={styles.b}>2,300</b>
                </div>
              </div>
              <img
                className={styles.immagineIcon}
                alt=""
                src="/immagine@2x.png"
              />
            </div>
            <div className={styles.valore1}>
              <div className={styles.valorecontent1}>
                <b className={styles.ferie1}>Straordinari Feriali</b>
                <div className={styles.value1}>
                  <b className={styles.b1}>2,300</b>
                </div>
              </div>
              <img
                className={styles.immagineIcon1}
                alt=""
                src="/immagine-1@2x.png"
              />
            </div>
            <div className={styles.valore2}>
              <div className={styles.valorecontent2}>
                <b className={styles.ferie2}>Straordinari Festivi</b>
                <div className={styles.value2}>
                  <b className={styles.b2}>2,300</b>
                </div>
              </div>
              <img
                className={styles.immagineIcon2}
                alt=""
                src="/immagine-2@2x.png"
              />
            </div>
          </div>
        </div>
        <div className={styles.analyticsCards1}>
          <div className={styles.anno2024Parent}>
            <b className={styles.anno2024}>Anno 2024</b>
            <b className={styles.cambiaAnno}>Cambia anno</b>
          </div>
          <div className={styles.riassuntoParent}>
            <b className={styles.riassunto}>Riassunto</b>
            <div className={styles.valoreGroup}>
              <div className={styles.valore3}>
                <div className={styles.valorecontent3}>
                  <b className={styles.ferie3}>Ferie</b>
                  <div className={styles.value3}>
                    <b className={styles.b3}>2,300</b>
                  </div>
                </div>
                <img
                  className={styles.immagineIcon3}
                  alt=""
                  src="/immagine@2x.png"
                />
              </div>
              <div className={styles.valore4}>
                <div className={styles.valorecontent4}>
                  <b className={styles.ferie4}>Straordinari Feriali</b>
                  <div className={styles.value4}>
                    <b className={styles.b4}>2,300</b>
                  </div>
                </div>
                <img
                  className={styles.immagineIcon4}
                  alt=""
                  src="/immagine-41@2x.png"
                />
              </div>
              <div className={styles.valore5}>
                <div className={styles.valorecontent5}>
                  <b className={styles.ferie5}>Straordinari Festivi</b>
                  <div className={styles.value5}>
                    <b className={styles.b5}>2,300</b>
                  </div>
                </div>
                <img
                  className={styles.immagineIcon5}
                  alt=""
                  src="/immagine-51@2x.png"
                />
              </div>
              <div className={styles.valore6}>
                <div className={styles.valorecontent6}>
                  <b className={styles.ferie6}>Permessi</b>
                  <div className={styles.value6}>
                    <b className={styles.b6}>2,300</b>
                  </div>
                </div>
                <img
                  className={styles.immagineIcon6}
                  alt=""
                  src="/immagine-2@2x.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.graficiaggregati}>
            <div className={styles.straordinari}>
              <b className={styles.straordinari1}>Straordinari</b>
              <div className={styles.graficostraordinari}>
                <img
                  className={styles.image1Icon}
                  alt=""
                  src="/image-11@2x.png"
                />
              </div>
            </div>
            <div className={styles.ferie7}>
              <b className={styles.ferie8}>Ferie</b>
              <div className={styles.graficostraordinari1}>
                <img
                  className={styles.image1Icon1}
                  alt=""
                  src="/image-1-11@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formData}>
          <form className={styles.dataInput}>
            <div className={styles.name}>
              <div className={styles.dataFieldLabels}>
                <div className={styles.data}>Data</div>
              </div>
              <div className={styles.name1}>
                <div className={styles.inputfieldtext}>
                  <input
                    className={styles.inserisciLaData}
                    placeholder="Inserisci la Data"
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
            <div className={styles.name2}>
              <div className={styles.oraIngressoWrapper}>
                <div className={styles.oraIngresso}>Ora Ingresso</div>
              </div>
              <div className={styles.name3}>
                <div className={styles.inputfieldtext1}>
                  <div className={styles.ora}>Ora</div>
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
            <div className={styles.name4}>
              <div className={styles.oraIngressoContainer}>
                <div className={styles.oraIngresso1}>Ora Ingresso</div>
              </div>
              <div className={styles.name5}>
                <div className={styles.inputfieldtext2}>
                  <div className={styles.ora1}>Ora</div>
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
            <div className={styles.name6}>
              <div className={styles.giornataSpecialeWrapper}>
                <div className={styles.giornataSpeciale}>Giornata Speciale</div>
              </div>
              <div className={styles.name7}>
                <div className={styles.inputfieldtext3}>
                  <input
                    className={styles.selezionaLaScelta}
                    placeholder="Seleziona la scelta"
                    type="text"
                  />
                  <img
                    className={styles.passwordTextIcon3}
                    alt=""
                    src="/password-text1.svg"
                  />
                  <div className={styles.minwidth3}>
                    <div className={styles.content3} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.name8}>
              <div className={styles.noteWrapper}>
                <div className={styles.note}>Note*</div>
              </div>
              <div className={styles.name9}>
                <div className={styles.inputfieldtext4}>
                  <input
                    className={styles.inserisciUnaNota}
                    placeholder="Inserisci una nota"
                    type="text"
                  />
                  <img
                    className={styles.passwordTextIcon4}
                    alt=""
                    src="/password-text1.svg"
                  />
                  <div className={styles.minwidth4}>
                    <div className={styles.content4} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.formButtons}>
              <div className={styles.submitButton}>
                <button className={styles.buttonbase}>
                  <b className={styles.buttonLabels}>Inserisci</b>
                </button>
                <button className={styles.buttonbase1}>
                  <b className={styles.text1}>Reset</b>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InsertData;
