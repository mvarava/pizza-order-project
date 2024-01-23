import React from 'react';

import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';
import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedType, setSelectedType] = useState({
    name: 'popularity',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = selectedType.sortProperty.replace('-', '');
    const order = selectedType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = selectedCategoryIndex > 0 ? `category=${selectedCategoryIndex}` : '';

    fetch(
      `https://65ae6f121dfbae409a74d2c4.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzaItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [selectedCategoryIndex, selectedType]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            selectedCategoryIndex={selectedCategoryIndex}
            onChangeCategory={(id) => setSelectedCategoryIndex(id)}
          />
          <Sort selectedType={selectedType} onChangeType={(id) => setSelectedType(id)} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
            : pizzaItems.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
