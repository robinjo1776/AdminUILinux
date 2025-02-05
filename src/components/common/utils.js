export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Function to validate a phone number (simple validation for numeric values)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// Function to validate a postal code (simple validation for numeric values)
export const isValidPostalCode = (postalCode) => {
  const postalCodeRegex = /^[0-9]{5,6}$/;
  return postalCodeRegex.test(postalCode);
};

// Optional: Additional utility function to validate email addresses
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};
export const isValidWebsite = (url) => {
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/;
  return urlRegex.test(url);
};

// Optional: Utility function to validate currency input (positive numeric values)
export const isValidCurrency = (currency) => {
  const currencyRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
  return currencyRegex.test(currency);
};

// Optional: Utility function to validate dates in YYYY-MM-DD format
export const isValidDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

// Optional: Utility function to validate time in HH:MM format
export const isValidTime = (time) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return timeRegex.test(time);
};
