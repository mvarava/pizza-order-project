import React, { useEffect, useState } from 'react';
import styles from './FullPizza.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65ae6f121dfbae409a74d2c4.mockapi.io/pizzas/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }

    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return 'Loading';
  }

  return (
    <div className={styles.container}>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book
      </p>
      <h4>{pizza.price} UAH</h4>
    </div>
  );
};

export default FullPizza;
