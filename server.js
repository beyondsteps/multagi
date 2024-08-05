const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { entryPrice, leverage, investment, additionalInvestment } = req.body;
    const liquidationPrice = calculateLiquidationPrice(entryPrice, leverage, investment, additionalInvestment);
    res.json({ liquidationPrice });
});

function calculateLiquidationPrice(entryPrice, leverage, investment, additionalInvestment) {
    const maintenanceMargin = 0.005;
    const totalInvestment = investment + additionalInvestment;
    const initialMargin = entryPrice / leverage;
    const liquidationPrice = entryPrice * (1 - (initialMargin - maintenanceMargin) / entryPrice);
    return liquidationPrice;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
