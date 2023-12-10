'use client';
import { Paginator, RangeSlider, Select, SwitchCheckbox } from '@/components';

export default function Home(): JSX.Element {
  return (
    <div>
      Home
      <br />
      {/* EXAMPLE COMPONENT */}
      <Select
        name="category"
        id="category"
        options={[
          { value: 'category', label: 'Категория' },
          { value: '1', label: '1' },
          { value: '2', label: '2' }
        ]}
      />
      <SwitchCheckbox name="discount" id="discount" label="Скидка" />
      <RangeSlider />
      <Paginator
        disable={{ left: true, right: false }}
        nav={{ current: 1, next: 2 }}
        onNextPageClick={() => {}}
        onPrevPageClick={() => {}}
      />
    </div>
  );
}
