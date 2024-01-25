const Categories = ({ selectedCategoryIndex, onChangeCategory }) => {
  const categories = ['All', 'Meat', 'Grill', 'Spicy', 'Vegetarian'];

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

export default Categories;
