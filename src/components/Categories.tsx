import React, { memo } from 'react';

type CategoriesProps = {
  selectedCategoryIndex: number;
  onChangeCategory: (i: number) => void;
};

const categories = ['All', 'Meat', 'Grill', 'Spicy', 'Vegetarian'];

const Categories: React.FC<CategoriesProps> = ({ selectedCategoryIndex, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={selectedCategoryIndex === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Categories);
