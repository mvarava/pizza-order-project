import { CartItem } from '../redux/cart/types';

export const getItemByParams = (items: CartItem[], item: CartItem) =>
  items.find(
    (curItem) => curItem.id === item.id && curItem.size === item.size && curItem.type === item.type,
  );
