// Main JavaScript file for the stock lookup service application
import { fetchStockData } from './api.js';
import { displayError } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const stockInput = document.getElementById('stock-input');
    const stockDisplay = document.getElementById('stock-display');
    const errorMessage = document.getElementById('error-message');

    stockForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();
        
        // Clear previous results and errors
        stockDisplay.innerHTML = '';
        errorMessage.textContent = '';
        
        const symbol = stockInput.value.trim().toUpperCase();
        
        if (!symbol) {
            displayError('Please enter a stock symbol', errorMessage);
            return;
        }
        
        try {
            // Show loading indicator
            stockDisplay.innerHTML = '<p>Loading...</p>';
            
            // Fetch stock data
            const stockData = await fetchStockData(symbol);
            
            // Display the stock data
            stockDisplay.innerHTML = `
                <div class="stock-card">
                    <h2>${stockData.symbol}</h2>
                    <p class="price">$${stockData.price.toFixed(2)}</p>
                    <p class="change ${stockData.change >= 0 ? 'positive' : 'negative'}">
                        ${stockData.change >= 0 ? '+' : ''}${stockData.change.toFixed(2)}%
                    </p>
                    <p class="volume">Volume: ${stockData.volume.toLocaleString()}</p>
                </div>
            `;
        } catch (error) {
            // Handle errors
            displayError('Error fetching stock data. Please try again.', errorMessage);
            console.error(error);
        }
    });
});