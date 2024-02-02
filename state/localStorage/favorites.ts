import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

export function useFavorites() {
  const favorites = useReadLocalStorage<number[]>('favorites');
  const [updateFavorites, setFavorites] = useLocalStorage<number[]>('favorites', favorites || []);

  const addFavorite = (sku: number) => {
    setFavorites((prev) => {
      const isNewSku = prev.some((item) => item === sku);
      if (isNewSku) {
        return prev;
      }
      return [...prev, sku];
    });
  };

  const removeFavorite = (sku: number) => {
    setFavorites((prev) => {
      return prev.filter((item) => item !== sku);
    });
  };

  return {
    favorites: updateFavorites,
    addFavorite,
    removeFavorite
  };
}
