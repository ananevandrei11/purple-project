'use client';
import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Paginator } from '@/components';
import { getProducts } from '@/api';
import { useShopPageContext } from '@/context/shopPageContext';
import { useLoadingContext } from '@/context/loadingContext';
import { ProductList } from '../ProductList/ProductList';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ErrorMessage = `Проблема с получением данных. Попробуйте позже.`;

export function ProductsListPaginator({ className }: Props) {
  const { params: paramsContext, productsList, setProductsList } = useShopPageContext();
  const { setLoading } = useLoadingContext();
  const { products, totalProducts, limit } = productsList;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  const onSubmit = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const data = await getProducts({
          ...paramsContext,
          offset: page - 1
        });

        if (!data) {
          throw new Error(ErrorMessage);
        }

        setProductsList(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : ErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, paramsContext, setProductsList]
  );

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onSubmit(page);
  };
  const onNextPageClick = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  const onPrevPageClick = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const onPageClick = (page: number) => {
    handleClick(page);
  };

  return (
    <section className={className}>
      <ProductList products={products} />
      {totalPages > 1 && (
        <Paginator
          disable={{ left: currentPage === 1, right: currentPage === totalPages }}
          currentPage={currentPage}
          nav={{
            first: currentPage < totalPages ? currentPage : currentPage - 1,
            second: currentPage === totalPages ? currentPage : currentPage + 1
          }}
          onPageClick={onPageClick}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
        />
      )}
    </section>
  );
}
