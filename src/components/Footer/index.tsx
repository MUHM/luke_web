import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>logo</span>
      <br />
      <span className={styles.copyright}>© copyright</span>
    </p>
  );
}