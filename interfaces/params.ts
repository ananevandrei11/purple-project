export interface IParamsProducts {
  limit: string | number;
  offset: string | number;
  name?: string;
  categoryId?: string | number;
  priceMin?: string | number;
  priceMax?: string | number;
  discounted?: 'true';
}
