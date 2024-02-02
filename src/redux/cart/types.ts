export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
