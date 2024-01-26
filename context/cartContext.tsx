'use client';
import { ICartItem } from '@/interfaces';
import {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
  Dispatch,
  useCallback
} from 'react';

interface ICartState {
  items: ICartItem[];
}

type ICartAction =
  | { type: 'ADD_ITEM'; payload: ICartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_COUNT_ITEM'; payload: ICartItem };

interface ICartContext {
  state: ICartState;
  dispatch: Dispatch<ICartAction>;
}

const initialCartState: ICartState = {
  items: []
};

const CartContext = createContext<ICartContext | null>(null);

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find((i) => i.sku === action.payload.sku)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.sku !== action.payload)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'ADD_COUNT_ITEM':
      if (state.items.find((i) => i.sku === action.payload.sku)) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.sku === action.payload.sku ? action.payload : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: PropsWithChildren<null>) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  const { state, dispatch } = context;

  const addItemToCart = (item: ICartItem) => {
    const itemSku = state.items.find((i) => i.sku === item.sku);
    if (itemSku) {
      dispatch({ type: 'REMOVE_ITEM', payload: item.sku });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
  };

  const removeItemFromCart = (sku: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: sku });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addCountItem = useCallback(
    (item: ICartItem) => {
      const itemSku = state.items.find((i) => i.sku === item.sku);
      if (!itemSku && item.count <= 0) {
        return;
      }
      if (itemSku && item.count <= 0) {
        dispatch({ type: 'REMOVE_ITEM', payload: item.sku });
      } else {
        dispatch({ type: 'ADD_COUNT_ITEM', payload: item });
      }
    },
    [state, dispatch]
  );

  const changeCountItem = useCallback(
    (item: ICartItem) => {
      if (item.count <= 0) {
        dispatch({ type: 'REMOVE_ITEM', payload: item.sku });
      } else {
        dispatch({ type: 'ADD_COUNT_ITEM', payload: item });
      }
    },
    [dispatch]
  );

  return { state, addItemToCart, removeItemFromCart, clearCart, addCountItem, changeCountItem };
};
