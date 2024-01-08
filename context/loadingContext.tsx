import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { LoadingFull } from '@/page-components';

interface ILoadingContext {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}
const initialState: ILoadingContext = {
  isLoading: false,
  setLoading: () => {}
};
const LoadingContext = createContext<ILoadingContext>(initialState);

export function LoadingContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState<boolean>(initialState.isLoading);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <LoadingFull />}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);

  return context;
}
