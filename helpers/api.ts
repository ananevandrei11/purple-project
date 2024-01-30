export const API = {
  products: '/products',
  productsFilter: '/products/get-filter',
  productSku: '/products/sku',
  productReview: (sku: number) => `/products/sku/${sku}/review`
};
