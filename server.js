const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { entryPrice, leverage, investment, trades, positionType } = req.body;
    const liquidationPrice = calculateLiquidationPrice(entryPrice, leverage, investment, trades, positionType);
    res.json({ liquidationPrice });
});

function calculateLiquidationPrice(entryPrice, leverage, investment, trades, positionType) {
    const maintenanceMargin = 0.005; // 0.5% 유지 마진 (거래소마다 다를 수 있음)
    let totalInvestment = investment;
    let totalEntryValue = entryPrice * investment;

    trades.forEach(trade => {
        totalInvestment += trade.investment;
        totalEntryValue += trade.entryPrice * trade.investment;
    });

    const averageEntryPrice = totalEntryValue / totalInvestment;
    const initialMargin = averageEntryPrice / leverage;
    let liquidationPrice;

    if (positionType === 'long') {
        liquidationPrice = averageEntryPrice * (1 - (initialMargin - maintenanceMargin) / averageEntryPrice);
    } else {
        liquidationPrice = averageEntryPrice * (1 + (initialMargin - maintenanceMargin) / averageEntryPrice);
    }

    return liquidationPrice;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
