import { FunctionComponent } from "react";
import styles from "./Sidebar.module.css";

export type SidebarType = {
  className?: string;
};

const Sidebar: FunctionComponent<SidebarType> = ({ className = "" }) => {
  return (
    <div className={[styles.sidebar, className].join(" ")}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <div className={styles.imageHolder}>
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
            <div className={styles.dashboardLabel}>
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
            <div className={styles.signOutLabel}>
              <b className={styles.logOut}>Log out</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
