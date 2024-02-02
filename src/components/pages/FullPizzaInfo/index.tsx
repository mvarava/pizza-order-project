import React, { useEffect, useState } from 'react';
import styles from './FullPizzaInfo.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PizzaTypeSelector from '../../PizzaBlock/PizzaTypeSelector';
import { CartItem } from '../../../redux/cart/types';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/cart/slice';

const typeName: string[] = ['thin', 'traditional'];

const FullPizzaInfo: React.FC = () => {
  const navigate = useNavigate();
  const { pizzaId } = useParams();
  const dispatch = useDispatch();

  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    prices: number[];
    description: string;
    ingredients: string;
    sizes: number[];
    types: number[];
  }>();

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

  const onClickAdd = () => {
    const item: CartItem = {
      id: pizza!.id,
      title: pizza!.title,
      price: pizza!.prices[selectedSizeIndex],
      imageUrl: pizza!.imageUrl,
      type: typeName[selectedTypeIndex],
      size: pizza!.sizes[selectedSizeIndex],
      count: 0,
    };

    dispatch(addItem(item));
  };

  if (!pizza) {
    return (
      <div className={styles.container}>
        <h2>Loading Pizza...</h2>
        <p>Please wait, your pizza will load in a moment</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4 className={styles.ingredients}>Ingredients: {pizza.ingredients}</h4>
      <div className={styles.selector}>
        <PizzaTypeSelector
          sizes={pizza.sizes}
          types={pizza.types}
          selectedTypeIndex={selectedTypeIndex}
          selectedSizeIndex={selectedSizeIndex}
          changeType={setSelectedTypeIndex}
          changeSize={setSelectedSizeIndex}
        />
      </div>
      <h4 className={styles.price}>{pizza.prices[selectedSizeIndex]} UAH</h4>
      <button onClick={onClickAdd} className="button button--outline button--add">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>Add</span>
      </button>
    </div>
  );
};

export default FullPizzaInfo;
