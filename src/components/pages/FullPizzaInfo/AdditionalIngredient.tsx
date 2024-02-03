import React from 'react';

type AdditionalIngredientProps = {
  ingredient: string;
};

const AdditionalIngredient: React.FC<AdditionalIngredientProps> = ({ ingredient }) => {
  return <div>{ingredient}</div>;
};
export default AdditionalIngredient;
