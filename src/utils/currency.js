export const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
};

export const formatCurrency = (amount, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || "";
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return currency === "INR" ? `${symbol}${formatted}` : `${formatted}${symbol}`;
};

export const convertCurrency = (
  amount,
  fromCurrency,
  toCurrency,
  exchangeRate
) => {
  if (!exchangeRate || fromCurrency === toCurrency) return amount;
  else if (fromCurrency === "USD" && toCurrency === "INR") {
    return amount * exchangeRate;
  } else if (fromCurrency === "INR" && toCurrency === "USD") {
    return amount / exchangeRate;
  }
  return amount;
};

export const convertToINR = (amount, currency, exchangeRate) => {
  return convertCurrency(amount, currency, "INR", exchangeRate);
};

export const calculateSaved = (contributions, goalCurrency, exchangeRate) => {
  if (!contributions.length || contributions === 0) return 0;
  return contributions.reduce((total, contributions) => {
    const amountInGoalCurrency = convertCurrency(
      contributions.amount,
      contributions.currency,
      goalCurrency,
      exchangeRate
    );
    return total + amountInGoalCurrency;
  }, 0);
};

export const calculateProgress = (saved, target) => {
  if (target === 0) return 0;
  const progress = (saved / target) * 100;
  return Math.min(Math.round(progress * 10) / 10, 100);
};

export const calculateRemaining = (target, saved) => {
  return Math.max(target - saved, 0);
};

export const isValidContribution = (amount, remaining) => {
  return amount > 0 && amount <= remaining;
};