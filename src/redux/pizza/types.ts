export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  prices: number[];
  sizes: number[];
  weights: number[];
  ingredients: string[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export type SearchPizzaParams = {
  currentPage: string;
  sortBy: string;
  order: string;
  category: string;
  search: string;
};
