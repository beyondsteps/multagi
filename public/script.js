document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const leverage = parseFloat(document.getElementById('leverage').value);
    const investment = parseFloat(document.getElementById('investment').value);
    const additionalInvestment = parseFloat(document.getElementById('additionalInvestment').value) || 0;

    const liquidationPrice = calculateLiquidationPrice(entryPrice, leverage, investment, additionalInvestment);
    document.getElementById('result').innerText = `Your liquidation price is: ${liquidationPrice.toFixed(2)} USDT`;
});

function calculateLiquidationPrice(entryPrice, leverage, investment, additionalInvestment) {
    // 기본 청산가 계산
    const maintenanceMargin = 0.005; // 0.5% 유지 마진 (거래소마다 다를 수 있음)
    const totalInvestment = investment + additionalInvestment;
    const initialMargin = entryPrice / leverage;
    const liquidationPrice = entryPrice * (1 - (initialMargin - maintenanceMargin) / entryPrice);

    return liquidationPrice;
}
