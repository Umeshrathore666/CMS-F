// Frontend/utils/formatDate.js

/**
 * Formats a date object or ISO string into a readable string format.
 * @param {Date|string} date - The date to format. Can be a Date object or an ISO date string.
 * @param {string} [format='yyyy-MM-dd'] - The format to use. Default is 'yyyy-MM-dd'.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date, format = 'yyyy-MM-dd') => {
    if (!date) return '';

    // Convert to Date object if input is an ISO string
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if input is a valid Date object
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
    }

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(format.includes('MMMM') && { month: 'long' }), // Full month name
        ...(format.includes('MMM') && { month: 'short' }), // Short month name
        ...(format.includes('dddd') && { weekday: 'long' }), // Full weekday name
        ...(format.includes('ddd') && { weekday: 'short' }), // Short weekday name
    };

    // Format the date
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};
