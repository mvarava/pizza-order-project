import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';
import Cart from './components/pages/Cart/Cart';
import { createContext, useState } from 'react';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
