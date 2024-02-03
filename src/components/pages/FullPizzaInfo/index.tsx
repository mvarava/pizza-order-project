import React, { useEffect, useRef, useState } from 'react';
import styles from './FullPizzaInfo.module.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PizzaTypeSelector from '../../PizzaBlock/PizzaTypeSelector';
import { CartItem } from '../../../redux/cart/types';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/cart/slice';
import AdditionalIngredient from './AdditionalIngredient';

const typeName: string[] = ['thin', 'traditional'];

const FullPizzaInfo: React.FC = () => {
  const navigate = useNavigate();
  const { pizzaId } = useParams();
  const dispatch = useDispatch();

  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    prices: number[];
    description: string;
    ingredients: string[];
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
    if (pizza) {
      const item: CartItem = {
        id: pizza.id,
        title: pizza.title,
        price: pizza.prices[selectedSizeIndex],
        imageUrl: pizza.imageUrl,
        ingredients: selectedIngredients,
        type: typeName[selectedTypeIndex],
        size: pizza.sizes[selectedSizeIndex],
        count: 0,
      };

      dispatch(addItem(item));
    }
  };

  const handleIngredientClick = (ingredient: string, ingredientIndex: number) => {
    if (ingredientIndex === 0) {
      return;
    }

    const index = selectedIngredients.indexOf(ingredient);

    if (index === -1) {
      setSelectedIngredients((prevState) => [...prevState, ingredient]);
    } else {
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients.splice(index, 1);
      setSelectedIngredients(updatedIngredients);
    }
  };

  if (!pizza) {
    return (
      <div className={styles.container}>
        <h2>Loading Pizza...</h2>
        <p>Please wait, your pizza will load in a moment</p>
      </div>
    );
  }

  const pizzaIngredients = (
    <ul className={styles['ingredients-list']}>
      {pizza.ingredients.map((ingredient, index) => (
        <li
          key={index}
          onClick={() => handleIngredientClick(ingredient, index)}
          className={selectedIngredients.includes(ingredient) ? 'selected' : ''}>
          {ingredient[0].toLocaleUpperCase() + ingredient.slice(1)}
          {selectedIngredients.includes(ingredient)
            ? index !== 0 && (
                <svg
                  className={styles['icon-active']}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="6" x2="12" y2="18" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                </svg>
              )
            : index !== 0 && (
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#FF0000" strokeWidth="2" />
                  <line
                    className={styles['first-line']}
                    x1="5"
                    y1="5"
                    x2="15"
                    y2="15"
                    stroke="#FF0000"
                    strokeWidth="2"
                  />
                  <line
                    className={styles['second-line']}
                    x1="5"
                    y1="15"
                    x2="15"
                    y2="5"
                    stroke="#FF0000"
                    strokeWidth="2"
                  />
                </svg>
              )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.container}>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h3 className={styles.ingredients}>Ingredients: </h3>
      {pizzaIngredients}
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
