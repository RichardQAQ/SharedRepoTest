// Main JavaScript file for the stock lookup service application
import { fetchStockData } from './api.js';
import { formatStockData, displayError } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const stockInput = document.getElementById('stock-input');
    const stockDisplay = document.getElementById('stock-display');

    stockForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const stockSymbol = stockInput.value.trim();

        if (stockSymbol) {
            try {
                const stockData = await fetchStockData(stockSymbol);
                const formattedData = formatStockData(stockData);
                stockDisplay.innerHTML = formattedData;
            } catch (error) {
                displayError('Error fetching stock data. Please try again.');
            }
        } else {
            displayError('Please enter a stock symbol.');
        }
    });
});