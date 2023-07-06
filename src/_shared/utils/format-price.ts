type TFormatPriceFn = (price: number, currency?: string) => string;

export const formatPrice: TFormatPriceFn = (price, currency = "ETH") =>
  `${price.toFixed(2)} ${currency}`;
