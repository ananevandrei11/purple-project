'use client';

import { DetailedHTMLProps, FormEvent, HTMLAttributes, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import { Search } from '@/Icon';
import styles from './SearchHeader.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  isShowForm?: boolean;
}

export default function SearchHeader({
  className,
  isShowForm = false,
  ...props
}: Props): JSX.Element {
  const id = useId();
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [isShowSearch, setShowSearch] = useState<boolean>(false);

  const inputVariants: Variants = {
    show: { width: '100%', padding: '5px 5px 5px 30px' },
    hide: { width: '0px', padding: 0 }
  };

  const labelVariants: Variants = {
    label: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      fontSize: '12px',
      lineHeight: '12px',
      transform: 'translateY(-50%)'
    },
    button: {
      position: 'relative',
      fontSize: '20px',
      lineHeight: '16px',
      transform: 'translateY(0)'
    }
  };

  const goToSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSearch(false);
    router.push('/shop' + '?' + `q=${search}`);
  };

  const showInput = () => {
    if (!isShowSearch) {
      setShowSearch(true);
    }
  };

  return (
    <form
      role="search"
      onSubmit={goToSearch}
      className={clsx(styles.form, className, {
        [styles.show]: isShowSearch,
        [styles.hide]: !isShowSearch,
        [styles.pure]: isShowForm
      })}
      {...props}>
      <motion.label
        onClick={showInput}
        initial={isShowForm ? 'label' : 'button'}
        animate={isShowSearch || isShowForm ? 'label' : 'button'}
        variants={labelVariants}
        htmlFor={`search-header-${id}`}>
        <Search className={styles.icon} />
      </motion.label>

      <motion.input
        className={styles.input}
        initial="hide"
        animate={isShowSearch || isShowForm ? 'show' : 'hide'}
        variants={inputVariants}
        type="search"
        id={`search-header-${id}`}
        name={`search-header-${id}`}
        placeholder="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
