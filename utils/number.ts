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
