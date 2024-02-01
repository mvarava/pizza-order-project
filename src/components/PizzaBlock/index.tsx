import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';
import { cartItemSelectorById, cartSelector } from '../../redux/cart/selectors';
import { Link } from 'react-router-dom';
import PizzaTypeSelector from './PizzaTypeSelector';

const typeName: string[] = ['thin', 'traditional'];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(cartItemSelectorById(id));
  const cartItems = useSelector(cartSelector)
    .items.filter((item) => item.id === cartItem?.id)
    .reduce((sum, cur) => sum + cur.count, 0);

  const addedCount = cartItem ? cartItem.count : 0;

  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(price);

  const currentPizzaSize = sizes[selectedSizeIndex];

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price: newPrice,
      imageUrl,
      type: typeName[selectedTypeIndex],
      size: currentPizzaSize,
      count: 0,
    };

    dispatch(addItem(item));
  };

  useEffect(() => {
    if (currentPizzaSize !== sizes[0]) {
      setNewPrice(() => Math.floor(price * (1 + currentPizzaSize / 100)));
    } else {
      setNewPrice(price);
    }
  }, [currentPizzaSize]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <PizzaTypeSelector
          sizes={sizes}
          types={types}
          selectedTypeIndex={selectedTypeIndex}
          selectedSizeIndex={selectedSizeIndex}
          changeType={setSelectedTypeIndex}
          changeSize={setSelectedSizeIndex}
        />
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {newPrice} UAH</div>
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
            {cartItems > 0 && <i>{cartItems}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
