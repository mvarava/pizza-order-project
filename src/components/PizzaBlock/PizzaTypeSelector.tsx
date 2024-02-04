import React, { memo } from 'react';

const typeName: string[] = ['thin', 'traditional'];

type PizzaTypeSelectorProps = {
  sizes: number[];
  types: number[];
  selectedTypeIndex: number;
  selectedSizeIndex: number;
  changeType: (i: number) => void;
  changeSize: (i: number) => void;
};

export const PizzaTypeSelector: React.FC<PizzaTypeSelectorProps> = memo(
  ({ sizes, types, selectedTypeIndex, selectedSizeIndex, changeType, changeSize }) => {
    return (
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => changeType(typeId)}
              className={selectedTypeIndex === typeId ? 'active' : ''}>
              {typeName[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => changeSize(index)}
              className={selectedSizeIndex === index ? 'active' : ''}>
              {size} sm
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
