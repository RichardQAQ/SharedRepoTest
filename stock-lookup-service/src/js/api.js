// This file handles API requests to fetch stock data.
// It exports functions such as fetchStockData(symbol) which takes a stock symbol as an argument and returns the stock information from an external API.

const API_URL = 'https://api.example.com/stocks'; // Replace with the actual API endpoint

export async function fetchStockData(symbol) {
    try {
        const response = await fetch(`${API_URL}?symbol=${symbol}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
}