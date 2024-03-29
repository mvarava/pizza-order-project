import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchPizzas } from '../../redux/pizza/asyncActions';
import { pizzaDataSelector } from '../../redux/pizza/selectors';

import {
  PizzaSkeleton,
  Sort,
  Categories,
  PizzaBlock,
  Pagination,
  PizzasFetchError,
} from '../../components';

import { useAppDispatch } from '../../redux/store';
import { setCategoryId, setPageCount } from '../../redux/filter/slice';
import { sortSelector } from '../../redux/filter/selectors';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sortType, currentPage, searchValue } = useSelector(sortSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        sortBy,
        order,
        category,
        search,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories selectedCategoryIndex={categoryId} onChangeCategory={onChangeCategory} />
          <Sort sortType={sortType} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        {status === 'error' ? (
          <PizzasFetchError />
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
