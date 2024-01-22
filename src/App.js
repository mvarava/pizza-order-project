import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">All pizzas</h2>
          <div class="content__items">
            <PizzaBlock title="Hawaiian" price="500" />
            <PizzaBlock title="Hawaiian" price="500" />
            <PizzaBlock title="Hawaiian" price="500" />
            <PizzaBlock title="Hawaiian" price="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
