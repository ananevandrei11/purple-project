'use client';
import { useState } from 'react';
import styles from './RangeSlider.module.css';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Props extends SliderProps {
  onRange?: (val: number[]) => void;
  defaultValue?: number[];
  nameMin?: string;
  nameMax?: string;
  id?: string;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  allowCross = false,
  defaultValue,
  nameMin = 'range-min',
  nameMax = 'range-max',
  onRange,
  className,
  ...props
}: Props) {
  const [valueMin, setValueMin] = useState(min);
  const [valueMax, setValueMax] = useState(max);

  const handleChange = ({ val }: { val: number[] }) => {
    setValueMin(val[0]);
    setValueMax(val[1]);
    onRange?.(val);
  };

  return (
    <div className={className}>
      <Slider
        {...props}
        className={styles.slider}
        min={min}
        max={max}
        defaultValue={defaultValue || [min, max]}
        step={step}
        range
        count={1}
        allowCross={allowCross}
        trackStyle={{
          backgroundColor: '#000',
          height: 2,
          border: 'none',
          borderRadius: 0
        }}
        railStyle={{
          backgroundColor: '#D8D8D8',
          height: 2,
          border: 'none',
          borderRadius: 0
        }}
        handleStyle={{
          backgroundColor: '#000',
          height: 10,
          width: 2,
          marginTop: '-4px',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          opacity: 1
        }}
        onChange={(val) => {
          if (Array.isArray(val)) {
            handleChange({ val });
          }
        }}
      />
      <input
        type="range"
        name={nameMin}
        id={nameMin}
        min={min}
        max={max}
        step={step || 1}
        value={valueMin}
        readOnly
        className={styles.input}
      />
      <input
        type="range"
        name={nameMax}
        id={nameMax}
        min={min}
        max={max}
        step={step || 1}
        value={valueMax}
        readOnly
        className={styles.input}
      />
    </div>
  );
}
