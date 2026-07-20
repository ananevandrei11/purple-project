export function numberToStringDigit(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/, ' ');
}

export function getPriceWithCurrency({
  price,
  locale = 'en-US',
  currency = 'USD'
}: {
  price: number;
  locale?: string;
  currency?: string;
}) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
}

export function getPriceWithDiscount({ price, discount }: { price: number; discount?: number }) {
  if (!discount) {
    return price;
  }
  return price * (1 - discount * 0.01);
}
