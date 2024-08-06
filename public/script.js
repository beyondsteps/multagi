document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateLiquidationPrice();
});

document.getElementById('additionalCheckbox').addEventListener('change', function() {
    const additionalFields = document.getElementById('additionalFields');
    additionalFields.style.display = this.checked ? 'block' : 'none';
});

document.querySelectorAll('#calculator-form input').forEach(input => {
    input.addEventListener('input', calculateLiquidationPrice);
});

function calculateLiquidationPrice() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const investment = parseFloat(document.getElementById('investment').value);
    const additionalCheckbox = document.getElementById('additionalCheckbox').checked;
    const additionalEntryPrice = additionalCheckbox ? parseFloat(document.getElementById('additionalEntryPrice').value) : 0;
    const additionalInvestment = additionalCheckbox ? parseFloat(document.getElementById('additionalInvestment').value) : 0;

    const data = {
        entryPrice,
        leverage,
        investment,
        additionalEntryPrice: additionalCheckbox ? additionalEntryPrice : null,
        additionalInvestment: additionalCheckbox ? additionalInvestment : null
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
        document.getElementById('result').innerText = `Your liquidation price is: ${result.liquidationPrice.toFixed(2)} USDT`;
    })
    .catch(error => console.error('Error:', error));
}
