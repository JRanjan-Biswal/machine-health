/**
 * Formats a number according to the selected currency type with proper comma formatting
 * @param {number} value - The number to format
 * @param {string} currencyType - The type of currency ('INR' or 'EURO')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currencyType, roundIt) => {
    // Convert value to number if it's a string
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    // Check if the value is a valid number
    if (isNaN(numValue)) {
        return '0';
    }

    // Round the number to remove decimals
    const roundedValue = roundIt ? Math.round(numValue) : numValue;

    // Format options based on currency type
    const formatOptions = {
        INR: {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: roundIt ? 0 : 2,
            maximumFractionDigits: roundIt ? 0 : 2,
            currencyDisplay: 'symbol'
        },
        EURO: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: roundIt ? 0 : 2,
            maximumFractionDigits: roundIt ? 0 : 2,
            currencyDisplay: 'symbol'
        }
    };

    try {
        // Get the appropriate format options for the currency type
        const options = formatOptions[currencyType] || formatOptions.INR;

        // Format the number using Intl.NumberFormat
        return new Intl.NumberFormat('en-IN', options).format(roundedValue);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return roundedValue.toString();
    }
};

/**
 * Converts a value from one currency to another
 * @param {number} value - The value to convert
 * @param {string} fromCurrency - The source currency ('INR' or 'EURO')
 * @param {string} toCurrency - The target currency ('INR' or 'EURO')
 * @param {number} exchangeRate - The exchange rate (e.g., 1 EURO = exchangeRate INR)
 * @returns {number} Converted value
 */
export const convertCurrency = (value, fromCurrency, toCurrency, exchangeRate, roundIt) => {
    if (fromCurrency === toCurrency) {
        return roundIt ? Math.round(value) : value;
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
        return 0;
    }

    let result;
    if (fromCurrency === 'EURO' && toCurrency === 'INR') {
        result = numValue * exchangeRate;
    } else if (fromCurrency === 'INR' && toCurrency === 'EURO') {
        result = numValue / exchangeRate;
    } else {
        result = numValue;
    }

    return roundIt ? Math.round(result) : result;
};

/**
 * Converts and formats a value from one currency to another in one step
 * @param {number} value - The value to convert and format
 * @param {string} fromCurrency - The source currency ('INR' or 'EURO')
 * @param {string} toCurrency - The target currency ('INR' or 'EURO')
 * @param {number} exchangeRate - The exchange rate (e.g., 1 EURO = exchangeRate INR)
 * @returns {string} Formatted and converted currency string
 */
export const convertAndFormatCurrency = (value, fromCurrency, toCurrency, exchangeRate, roundIt) => {
    // First convert the currency
    const convertedValue = convertCurrency(value, fromCurrency, toCurrency, exchangeRate, roundIt);

    // Then format the converted value
    return formatCurrency(convertedValue, toCurrency, roundIt);
};

/**
 * Formats a value using the current currency context
 * @param {number} value - The value to format
 * @param {Object} currencyContext - The currency context object containing selectedCurrency and currencyValue
 * @returns {string} Formatted currency string
 */
export const formatWithContext = (value, currencyContext, roundIt = true) => {
    const { selectedCurrency, currencyValue } = currencyContext;
    return formatCurrency(value, selectedCurrency, roundIt);
};


/**
 * Converts and formats a value using the current currency context
 * @param {number} value - The value to convert and format
 * @param {Object} currencyContext - The currency context object containing selectedCurrency and currencyValue
 * @returns {string} Formatted and converted currency string
 */
export const convertAndFormatWithContext = (value, currencyContext, roundIt = true) => {
    const { selectedCurrency, currencyValue } = currencyContext;

    // If the value is already in the selected currency, just format it
    if (selectedCurrency === 'EURO') {
        const formattedValue = formatCurrency(value, 'EURO', roundIt);
        return formattedValue.startsWith('€') ? formattedValue : `€${formattedValue}`;
    }

    // Convert from EURO to INR if needed
    const convertedValue = convertAndFormatCurrency(value, 'EURO', selectedCurrency, currencyValue, roundIt);
    return convertedValue.startsWith('₹') ? convertedValue : `₹${convertedValue}`;
};

// Example usage with context:
// const { selectedCurrency, currencyValue } = useCurrency();
// const formattedValue = formatWithContext(number_from_user, { selectedCurrency, currencyValue });
// const convertedValue = convertAndFormatWithContext(number_from_user, { selectedCurrency, currencyValue });


// This function is used to convert and format a value without the symbol
// It is used to display the value without the symbol
export const convertAndFormatWithContextNoSymbol = (value, currencyContext, roundIt = true) => {
    const { selectedCurrency, currencyValue } = currencyContext;

    // If the value is already in the selected currency, just format it
    if (selectedCurrency === 'EURO') {
        return formatCurrency(value, 'EURO', roundIt).replace('€', '');
    }

    // Convert from EURO to INR if needed and format
    return convertAndFormatCurrency(value, 'EURO', selectedCurrency, currencyValue, roundIt).replace('₹', '');
};