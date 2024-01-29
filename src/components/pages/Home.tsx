import React, { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas, pizzaDataSelector } from '../../redux/slices/pizzaSlice';
import { setCategoryId, setPageCount, sortSelector } from '../../redux/slices/filterSlice';
import PizzaSkeleton from '../PizzaBlock/PizzaSkeleton';
import Sort from '../Sort';
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Pagination from '../Pagination';
import PizzasFetchError from '../PizzasFetchError';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = useRef(false);

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

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       categoryId,
  //       currentPage,
  //       sortProperty: sortType.sortProperty,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   // isMounted.current = true;
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sortType, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sort = filterList.find((filter) => filter.sortProperty === params.sortBy);

  //     // if (sort) {
  //     //   params.sortBy = sort;
  //     // }

  //     console.log('Params: ', params);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sortType: sort || filterList[0],
  //       }),
  //     );
  //   }
  // }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

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
