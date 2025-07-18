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
document.getElementById('lookupButton').addEventListener('click', async () => {
    const stockSymbol = document.getElementById('stockSymbol').value.trim();
    const stockInfoDiv = document.getElementById('stockInfo');
    const errorMessageDiv = document.getElementById('errorMessage');
    const stockImagesDiv = document.getElementById('stockImages');
    const stockNewsDiv = document.getElementById('stockNews');

    stockInfoDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';
    stockImagesDiv.innerHTML = '';
    stockNewsDiv.innerHTML = '';

    if (!stockSymbol) {
        errorMessageDiv.textContent = 'Please enter a stock symbol.';
        return;
    }

    try {
        // 获取股票信息
        const stockData = await fetchStockData(stockSymbol);
        stockInfoDiv.innerHTML = `
            <p><strong>Symbol:</strong> ${stockData.symbol}</p>
            <p><strong>Price:</strong> $${stockData.price}</p>
            <p><strong>Company:</strong> ${stockData.companyName}</p>
        `;

        // 获取相关图片
        const images = await fetchStockImages(stockSymbol);
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            stockImagesDiv.appendChild(img);
        });

        // 获取相关新闻
        const news = await fetchStockNews(stockSymbol);
        news.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            `;
            stockNewsDiv.appendChild(articleElement);
        });
    } catch (error) {
        errorMessageDiv.textContent = error.message || 'Failed to fetch stock data.';
    }
});