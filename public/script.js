document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateLiquidationPrice();
});

document.getElementById('addTradeButton').addEventListener('click', function() {
    addTradeFields();
});

document.querySelectorAll('#calculator-form input, #calculator-form select').forEach(input => {
    input.addEventListener('input', calculateLiquidationPrice);
});

function addTradeFields() {
    const additionalTrades = document.getElementById('additionalTrades');
    const tradeIndex = additionalTrades.children.length;

    const tradeDiv = document.createElement('div');
    tradeDiv.className = 'additional-trade';
    tradeDiv.innerHTML = `
        <h3>Trade ${tradeIndex + 1}</h3>
        <div class="form-group">
            <label for="additionalEntryPrice${tradeIndex}">Additional Entry Price (USDT):</label>
            <input type="number" id="additionalEntryPrice${tradeIndex}" name="additionalEntryPrice${tradeIndex}" required>
        </div>
        <div class="form-group">
            <label for="additionalInvestment${tradeIndex}">Additional Investment (USDT):</label>
            <input type="number" id="additionalInvestment${tradeIndex}" name="additionalInvestment${tradeIndex}" required>
        </div>
    `;
    additionalTrades.appendChild(tradeDiv);

    tradeDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', calculateLiquidationPrice);
    });
}

function calculateLiquidationPrice() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const investment = parseFloat(document.getElementById('investment').value);
    const positionType = document.getElementById('positionType').value;

    const trades = [];
    const additionalTrades = document.getElementById('additionalTrades');
    for (let i = 0; i < additionalTrades.children.length; i++) {
        const entryPrice = parseFloat(document.getElementById(`additionalEntryPrice${i}`).value);
        const investment = parseFloat(document.getElementById(`additionalInvestment${i}`).value);
        trades.push({ entryPrice, investment });
    }

    const data = {
        entryPrice,
        leverage,
        investment,
        trades,
        positionType
    };

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('result').innerText = `Your liquidation price is : ${result.liquidationPrice.toFixed(2)} USDT`;
    })
    .catch(error => console.error('Error:', error));
}
