import React from 'react';
import ReactPaginate from 'react-paginate';

import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';
import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://65ae6f121dfbae409a74d2c4.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzaItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [selectedCategoryIndex, selectedType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = pizzaItems.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

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
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
};

export default Home;
