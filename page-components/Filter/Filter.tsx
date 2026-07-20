'use client';
import { DetailedHTMLProps, FormEvent, FormHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Button, InputGroup, RangeSlider, Select, SwitchCheckbox, TextElement } from '@/components';
import { IFilter } from '@/interfaces';
import { getPriceWithCurrency } from '@/utils';
import styles from './Filter.module.css';
import { getProducts } from '@/api';
import { useShopPageContext } from '@/context/shopPageContext';
import { useLoadingContext } from '@/context/loadingContext';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  filter: IFilter;
}
const ErrorMessage = `Проблема с получением данных. Попробуйте позже.`;

export function Filter({ filter, className }: Props) {
  const { categories, maxPrice, minPrice } = filter;
  const {
    params: paramsContext,
    setParams: setParamsContext,
    setProductsList
  } = useShopPageContext();
  const { setLoading } = useLoadingContext();

  const [search, setSearch] = useState<string>();
  const [prices, setPrices] = useState<number[]>([minPrice, maxPrice]);
  const [discounted, setDiscounted] = useState<'true' | undefined>(undefined);
  const [categoryId, setCategoryId] = useState('');

  const options = categories.map((opt) => ({ value: opt.id, label: opt.name }));
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const params = {
        ...paramsContext,
        name: search,
        discounted,
        categoryId: categoryId !== 'default' ? categoryId : undefined,
        priceMin: prices[0],
        priceMax: prices[1],
        offset: 0
      };

      const data = await getProducts({
        ...params
      });

      if (!data) {
        throw new Error(ErrorMessage);
      }

      setParamsContext(params);
      setProductsList(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={clsx(className, styles.form)} onSubmit={onSubmit}>
      <InputGroup>
        <InputGroup.Input
          isAddonRight
          type="text"
          id="name"
          name="name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Поиск..."
        />
        <InputGroup.Addon type="submit" variant="search" side="right" />
      </InputGroup>
      <Select
        name="categoryId"
        id="categoryId"
        options={[{ value: 'default', label: 'Категория' }, ...options]}
        onChange={(e) => {
          setCategoryId(e.target.value);
        }}
      />
      <RangeSlider
        min={minPrice}
        max={maxPrice}
        nameMin="priceMin"
        nameMax="priceMax"
        defaultValue={prices}
        onRange={setPrices}
      />
      <TextElement variant="bodyMedium" tag="p">
        Цена: {getPriceWithCurrency({ price: prices[0] })}
        {' - '}
        {getPriceWithCurrency({ price: prices[1] })}
      </TextElement>
      <SwitchCheckbox
        name="discounted"
        id="discounted"
        label="Скидка"
        onChange={(e) => {
          setDiscounted(e.target.checked ? 'true' : undefined);
        }}
      />
      <Button variant="white" fluid type="submit">
        Применить
      </Button>
    </form>
  );
}
