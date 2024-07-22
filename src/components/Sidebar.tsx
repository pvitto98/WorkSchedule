import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export type SidebarType = {
  className?: string;
};

const Sidebar: FunctionComponent<SidebarType> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${className} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logoWrapper} onClick={toggleSidebar}>
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
      {isOpen && (
        <>
          <img
            className={styles.sidebarChild}
            loading="lazy"
            alt=""
            src="/vector-6.svg"
          />
          <div className={styles.menuWrapper}>
            <div className={styles.menu}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                }
              >
                <img
                  className={styles.image4Icon}
                  loading="lazy"
                  alt=""
                  src="/image-4@2x.png"
                />
                <div className={styles.dashboardLabel}>
                  <b className={styles.dashboard1}>Dashboard</b>
                </div>
              </NavLink>
              <NavLink
                to="/insertdata"
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                }
              >
                <div className={styles.iconWrapper}>
                  <img
                    className={styles.icon}
                    loading="lazy"
                    alt=""
                    src="/ioniconrrocketsharp.svg"
                  />
                </div>
                <div className={styles.label}>
                  <b className={styles.addData}>Aggiungi dato</b>
                </div>
              </NavLink>
              <NavLink
                to="/monthlydatascreen"
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                }
              >
                <div className={styles.iconWrapper}>
                  <img
                    className={styles.icon}
                    loading="lazy"
                    alt=""
                    src="/ioniconrrocketsharp.svg"
                  />
                </div>
                <div className={styles.label}>
                  <b className={styles.addData}>Tabella Dati</b>
                </div>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                }
              >
                <div className={styles.iconWrapper}>
                  <img
                    className={styles.icon}
                    loading="lazy"
                    alt=""
                    src="/ioniconrrocketsharp.svg"
                  />
                </div>
                <div className={styles.label}>
                  <b className={styles.logOut}>Log out</b>
                </div>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
