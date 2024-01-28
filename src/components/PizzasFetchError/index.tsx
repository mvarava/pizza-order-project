import React from 'react';
import styles from './PizzasFetchError.module.scss';

const PizzasFetchError: React.FC = () => {
  return (
    <div className={styles.error}>
      <h2>
        Error occured<span>😕</span>
      </h2>
      <p>
        Failed to get pizzas
        <br />
        Please try again later
      </p>
    </div>
  );
};

export default PizzasFetchError;
