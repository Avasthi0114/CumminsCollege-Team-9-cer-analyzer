// Function to convert currency
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const selectedCurrency = document.getElementById('currency').value;
    const selectedDate = document.getElementById('date').value;
  
    fetch('merged-csv-files.csv')
      .then(response => response.text())
      .then(csvData => {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
  
        // Find the index of USD column
        const usdIndex = headers.indexOf('U.S. dollar   (USD)');
  
        // Find the index of the selected currency column
        const selectedCurrencyIndex = headers.indexOf(selectedCurrency);
  
        // Find the index of the date column
        const dateIndex = headers.indexOf('Date');
  
        // Extract exchange rates for USD, selected currency, and the given date
        const usdRates = [];
        const selectedCurrencyRates = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].split(',');
          const currentDate = line[dateIndex].trim();  // Trim whitespace around the date
          if (currentDate === selectedDate) {
            usdRates.push(parseFloat(line[usdIndex]));
            selectedCurrencyRates.push(parseFloat(line[selectedCurrencyIndex]));
          }
        }
  
        // Check if exchange rates are available for the given date
        if (usdRates.length === 0 || selectedCurrencyRates.length === 0) {
          alert(`Exchange rates not available for the selected date: ${selectedDate}`);
          return;
        }
  
        // Convert the given amount to the selected currency
        const convertedAmount = (amount * selectedCurrencyRates[0]).toFixed(2);
  
        // Display the result
        const convertedAmountElement = document.getElementById('convertedAmount');
        convertedAmountElement.textContent = `Converted Amount: ${convertedAmount} ${selectedCurrency}`;
      })
      .catch(error => console.error('Error:', error));
  }
  