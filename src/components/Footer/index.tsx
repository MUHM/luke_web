import React from 'react';
import styles from './index.module.scss';

export interface IFooterProps {
  copyright?: string;
  text?: string;
  image?: string;
}

export default function Footer({ copyright, image, text }: IFooterProps) {
  return (
    <p className={styles.footer}>
      {image && <img src={image} />}
      <span className={styles.logo}>{text}</span>
      <br />
      <span className={styles.copyright}>{copyright}</span>
    </p>
  );
}