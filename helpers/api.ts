export const API = {
  products: '/products',
  productsFilter: '/products/get-filter',
  productSku: '/products/sku',
  productReview: (sku: number) => `/products/sku/${sku}/review`,
  order: {
    create: '/order',
    getById: (id: string) => `/order/${id}`,
    my: '/order/my'
  },
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    restore: '/auth/restore',
    refresh: '/auth/refresh'
  },
  user: {
    update: '/user/profile',
    profile: '/user/profile'
  }
};
