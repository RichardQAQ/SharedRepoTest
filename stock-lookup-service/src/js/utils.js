// Utility functions for the stock lookup service

export function formatStockData(data) {
    // Format the stock data for display
    return {
        symbol: data.symbol,
        price: `$${data.price.toFixed(2)}`,
        change: `${data.change.toFixed(2)}%`,
        volume: data.volume.toLocaleString(),
    };
}

export function displayError(message) {
    // Display an error message to the user
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}