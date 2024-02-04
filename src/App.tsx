import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Home from './components/pages/Home';
import MainLayout from './layouts/MainLayout';
import React, { Suspense } from 'react';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './components/pages/Cart'));

const FullPizzaInfo = React.lazy(
  () => import(/* webpackChunkName: "FullPizzaInfo" */ './components/pages/FullPizzaInfo'),
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './components/pages/NotFound'),
);

const App: React.FC = () => {
  const lazyContent = (
    <div className="lazy-text">
      <h2>Loading content...</h2>
      <h3>Please wait, your content will load in a moment</h3>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={lazyContent}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={lazyContent}>
              <FullPizzaInfo />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={lazyContent}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
