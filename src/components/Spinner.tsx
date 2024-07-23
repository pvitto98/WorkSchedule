import React from 'react';
import styles from './Spinner.module.css'; // Import your spinner styles

const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;