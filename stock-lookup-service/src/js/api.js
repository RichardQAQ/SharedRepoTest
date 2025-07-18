// This file handles API requests to fetch stock data

const API_KEY = 'TSHE5PBR7U1GM3LL'; // Alpha Vantage API key
const API_URL = 'https://www.alphavantage.co/query';

// Set to true to use mock data instead of real API
const USE_MOCK_DATA = false;

// Mock stock data for testing
const MOCK_STOCKS = {
    'AAPL': {
        symbol: 'AAPL',
        price: 172.82,
        change: 1.45,
        volume: 58492654
    },
    'MSFT': {
        symbol: 'MSFT',
        price: 415.75,
        change: -0.62,
        volume: 22567890
    },
    'GOOGL': {
        symbol: 'GOOGL',
        price: 152.33,
        change: 2.18,
        volume: 15234567
    },
    'AMZN': {
        symbol: 'AMZN',
        price: 178.75,
        change: 0.89,
        volume: 32456789
    },
    'TSLA': {
        symbol: 'TSLA',
        price: 231.05,
        change: -3.24,
        volume: 87654321
    }
};

/**
 * Get mock stock data for testing
 * @param {string} symbol - The stock symbol to look up
 * @returns {Promise<Object>} - Mock stock data object
 */
async function getMockStockData(symbol) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            const stockData = MOCK_STOCKS[symbol];
            if (stockData) {
                resolve(stockData);
            } else {
                reject(new Error('No data found for this stock symbol'));
            }
        }, 500); // 500ms delay to simulate network request
    });
}

/**
 * Fetch stock data from the API
 * @param {string} symbol - The stock symbol to look up
 * @returns {Promise<Object>} - Stock data object
 */
export async function fetchStockData(symbol) {
    // Use mock data if flag is set to true
    if (USE_MOCK_DATA) {
        return getMockStockData(symbol);
    }
    
    try {
        const response = await fetch(`${API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Check if the API returned an error
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        
        // Check if the API returned data
        if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            throw new Error('No data found for this stock symbol');
        }
        
        // Transform the API response into the format your app expects
        return {
            symbol: data['Global Quote']['01. symbol'],
            price: parseFloat(data['Global Quote']['05. price']),
            change: parseFloat(data['Global Quote']['10. change percent'].replace('%', '')),
            volume: parseInt(data['Global Quote']['06. volume'])
        };
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
}