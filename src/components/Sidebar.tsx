import React, { FunctionComponent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";

export type SidebarType = {
  className?: string;
};

const Sidebar: FunctionComponent<SidebarType> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 900) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
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
            <motion.div
              className={styles.menu}
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div variants={buttonVariants}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                  }
                  onClick={toggleSidebar}
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
              </motion.div>

              <motion.div variants={buttonVariants}>
                <NavLink
                  to="/insertdata"
                  className={({ isActive }) =>
                    isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                  }
                  onClick={toggleSidebar}
                >
                  <div className={styles.iconWrapper}>
                    <img
                      className={styles.icon2}
                      loading="lazy"
                      alt=""
                      src="/add_button.svg"
                    />
                  </div>
                  <div className={styles.label}>
                    <b className={styles.addData}>Aggiungi dato</b>
                  </div>
                </NavLink>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <NavLink
                  to="/monthlydatascreen"
                  className={({ isActive }) =>
                    isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                  }
                  onClick={toggleSidebar}
                >
                  <div className={styles.iconWrapper}>
                    <img
                      className={styles.icon2}
                      loading="lazy"
                      alt=""
                      src="/table_icon.svg"
                    />
                  </div>
                  <div className={styles.label}>
                    <b className={styles.addData}>Tabella Dati</b>
                  </div>
                </NavLink>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${styles.active} ${styles.menuItem}` : styles.menuItem
                  }
                  onClick={toggleSidebar}
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
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
