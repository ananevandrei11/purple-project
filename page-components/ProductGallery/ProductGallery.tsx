'use client';
import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from './ProductGallery.module.css';
import { Thumbs } from './components/Thumbs';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  slides: string[];
}

export function ProductGallery({ slides, className, ...props }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'center',
    containScroll: 'keepSnaps',
    skipSnaps: true
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateCurrent = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleThumbClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index, true);
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', updateCurrent);
  }, [emblaApi, updateCurrent]);

  return (
    <section className={clsx(styles.root, className)} {...props}>
      <Thumbs
        slides={slides}
        onThumbsClick={handleThumbClick}
        activeItem={selectedIndex}
        className={styles.thumbs}
      />
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((item, index) => (
            <div className={styles.slide} key={uuidv4()} aria-label={`slide-${index}`}>
              <Image fill objectFit="cover" objectPosition="bottom" src={item} alt=" " />
            </div>
          ))}
        </div>
        <div
          className={styles.bar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuenow={selectedIndex}
          aria-valuemax={slides.length - 1}>
          {slides.map((_, index) => (
            <div
              style={{ width: `${100 / slides.length}%` }}
              className={clsx({ [styles.progress]: index <= selectedIndex })}
              key={uuidv4()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
