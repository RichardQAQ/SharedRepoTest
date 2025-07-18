// In utils.js
import { fetchStockData } from './api.js';

// Utility functions for the stock lookup service

/**
 * Format stock data for display
 * @param {Object} data - The stock data to format
 * @returns {Object} - Formatted stock data
 */
export function formatStockData(data) {
    // Format the stock data for display
    return {
        symbol: data.symbol,
        price: formatCurrency(data.price),
        change: `${data.change.toFixed(2)}%`,
        volume: data.volume.toLocaleString(),
    };
}

/**
 * Display an error message
 * @param {string} message - The error message to display
 * @param {HTMLElement} element - The element to display the error in
 */
export function displayError(message, element = document.getElementById('error-message')) {
    element.textContent = message;
    element.style.display = 'block';
}

/**
 * Format currency values
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}