export const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$'
};

export const formatCurrency = (amount, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '';
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  return currency === 'INR' ? `${symbol}${formatted}` : `${formatted}${symbol}`;
};

export const convertCurrency=(amount,fromCurrency,toCurrency,exchangeRate)=>{
    if(!exchangeRate || fromCurrency===toCurrency) return amount;
    else if (fromCurrency==='USD'&& toCurrency==='INR'){
        return amount*exchangeRate;
    } 
    else if (fromCurrency==='INR'&& toCurrency==='USD'){
        return amount/exchangeRate;
    }
    return amount;
}

export const convertToINR=(amount,currency,exchangeRate)=>{
    return convertCurrency(amount,currency,'INR',exchangeRate);
};
