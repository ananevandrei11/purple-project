export interface IFilter {
  categories: ICategory[];
  maxPrice: number;
  minPrice: number;
}

export interface ICategory {
  id: number;
  name: string;
}
