import { CartItem } from '../redux/cart/types';

export const isSearchItem = (item1: CartItem, item2: CartItem) =>
  item1.id === item2.id && item1.type === item2.type && item1.size === item2.size;
