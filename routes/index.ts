export const ROUTES = {
  home: '/',
  about: '/about',
  login: '/login',
  favorites: '/favorites',
  cart: '/cart',
  cartResult: '/cart/result',
  shop: '/shop',
  shopSku: (sku: string | number) => `/shop/${sku}`
};
