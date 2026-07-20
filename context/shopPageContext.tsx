import { IParamsProducts, IProductList } from '@/interfaces';
import { ReactNode, createContext, useContext, useState } from 'react';

interface IShopPageContext {
  productsList: IProductList;
  params: IParamsProducts;
  setProductsList: (productsList: IProductList) => void;
  setParams: (params: IParamsProducts) => void;
}
const initialState: IShopPageContext = {
  productsList: {
    products: [],
    totalProducts: 0,
    limit: 0,
    offset: 0
  },
  params: {
    limit: 6,
    offset: 0
  },
  setProductsList: () => {},
  setParams: () => {}
};
const ShopPageContext = createContext<IShopPageContext>(initialState);

export type ProviderProps = {
  productsList?: IProductList;
  children: ReactNode;
};
export function ShopPageContextProvider({
  productsList: productsListValue,
  children
}: ProviderProps) {
  const [productsList, setProductsList] = useState<IProductList>(
    productsListValue || initialState.productsList
  );
  const [params, setParams] = useState<IParamsProducts>(initialState.params);

  return (
    <ShopPageContext.Provider value={{ productsList, params, setProductsList, setParams }}>
      {children}
    </ShopPageContext.Provider>
  );
}

export function useShopPageContext() {
  const context = useContext(ShopPageContext);

  return context;
}
