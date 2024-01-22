import React from 'react';
import styles from './NotFoundBlock.module.css';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Nothing Found
      </h1>
      <p className={styles.description}>This Page Is Not Found</p>
    </div>
  );
};

export default NotFoundBlock;
