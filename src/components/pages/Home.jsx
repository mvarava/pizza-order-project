import React, { useContext } from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setPageCount,
  setFilters,
  sortSelector,
} from '../../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaDataSelector } from '../../redux/slices/pizzaSlice';

import PizzaSkeleton from '../PizzaBlock/PizzaSkeleton';
import Sort, { filterList } from '../Sort';
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import PizzasFetchError from '../PizzasFetchError';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(sortSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage,
        sortBy,
        order,
        category,
        search,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortProperty: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = filterList.find((filter) => filter.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          categoryId: params.categoryId,
          currentPage: params.currentPage,
          sortType: sort,
        }),
      );
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories selectedCategoryIndex={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        {status === 'error' ? (
          <PizzasFetchError />
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
        <Pagination page={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
