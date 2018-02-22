import React from 'react';

import styles from './Footer.css';

const footer = () => (
  <footer className={styles.Footer}>
    <p>Made by <a className={styles.Link} href="https://github.com/olbesp">Oleksii Bespalko</a> using FreeCodeCamp Weather API and Google Maps API</p>
  </footer>
);

export default footer;