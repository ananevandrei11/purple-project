const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const DummyAPI = {
  products: {
    get: DOMAIN + '/products'
  }
};
