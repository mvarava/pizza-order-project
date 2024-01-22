import { useState } from 'react';

const Categories = () => {
  const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);

  const categories = ['All', 'Meat', 'Grill', 'Spicy', 'Vegetarian'];

  const onCLickCategory = (index) => {
    setselectedCategoryIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onCLickCategory(index)}
            className={selectedCategoryIndex === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
