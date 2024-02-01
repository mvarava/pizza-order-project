import { Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';
import Cart from './components/pages/Cart/Cart';
import Home from './components/pages/Home';
import FullPizza from './components/pages/FullPizzaInfo';
import MainLayout from './layouts/MainLayout';
import React from 'react';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
