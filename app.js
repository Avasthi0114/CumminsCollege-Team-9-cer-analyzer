let exchangeRateData;

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            parseCSV(e.target.result);
        };
        reader.readAsText(file);
    }
}

function parseCSV(csvData) {
    Papa.parse(csvData, {
        header: true,
        complete: function (result) {
            const currencies = Object.keys(result.data[0]).filter(currency => currency !== 'Date');
            populateCurrencyOptions(currencies);
            exchangeRateData = result.data;
        }
    });
}

function populateCurrencyOptions(currencies) {
    const currency2Select = document.getElementById('currency2');
    currency2Select.innerHTML = '';

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        currency2Select.add(option);
    });
}

function generateChart() {
    const currency2 = document.getElementById('currency2').value;
    const duration = document.getElementById('duration').value;

    if (!exchangeRateData || exchangeRateData.length === 0) {
        alert('No data available for chart generation.');
        return;
    }

    const chartData = exchangeRateData.map(entry => ({
        x: entry.Date ? new Date(entry.Date) : null,
        y: entry[currency2] ? parseFloat(entry[currency2]) : null,
    }));

    // Log chartData for debugging
    console.log('chartData:', chartData);

    // Remove entries where x or y is null
    const filteredChartData = chartData.filter(entry => entry.x !== null && entry.y !== null);

    if (filteredChartData.length === 0) {
        alert('No valid data available for chart generation.');
        return;
    }

    const options = {
        chart: {
            type: 'line',
            height: 350,
        },
        series: [{
            name: `${currency2}/USD Exchange Rate`,
            data: filteredChartData,
        }],
        xaxis: {
            type: 'datetime',
        },
    };

    if (!window.chart) {
        // Create a new chart instance
        window.chart = new ApexCharts(document.getElementById('chartContainer'), options);
        window.chart.render();
    } else {
        // Update the existing chart with new data
        window.chart.updateOptions(options);
    }

    const highestEntry = filteredChartData.reduce((prev, current) => (prev.y > current.y) ? prev : current);
    const lowestEntry = filteredChartData.reduce((prev, current) => (prev.y < current.y) ? prev : current);

    const highestRate = highestEntry.y.toFixed(2);
    const highestDate = highestEntry.x.toISOString().split('T')[0];
    const lowestRate = lowestEntry.y.toFixed(2);
    const lowestDate = lowestEntry.x.toISOString().split('T')[0];

    // Display on the webpage
    document.getElementById('highestRate').textContent = `Highest exchange rate: ${highestRate} on ${highestDate}`;
    document.getElementById('lowestRate').textContent = `Lowest exchange rate: ${lowestRate} on ${lowestDate}`;
}
