import { FunctionComponent, useEffect } from "react";
import EmailPasswordFields from "../components/EmailPasswordFields";
import { motion, useAnimation } from "framer-motion";
import styles from "./Login.module.css";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Login: FunctionComponent = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ y: 0, opacity: 1, transition: { duration: 1 } });
      await controls.start({
        x: ["0%", "2%", "0%", "-2%", "0%"],
        y: ["0%", "2%", "0%", "-2%", "0%"],
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      });
    };
    sequence();
  }, [controls]);

  return (
    <div className={styles.login}>

      <motion.div 
        className={styles.emailPasswordFieldsWrapper}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        
      <LanguageSwitcher/>
        <EmailPasswordFields />
      </motion.div>
      <motion.div 
        className={styles.immagineloginContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <motion.img
          className={styles.immagineloginIcon}
          loading="lazy"
          alt=""
          src="/immaginelogin@2x.png"
          animate={controls}
          initial={{ scale: 1.2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Login;
