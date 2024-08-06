const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { entryPrice, leverage, investment, additionalEntryPrice, additionalInvestment } = req.body;
    let liquidationPrice;

    if (additionalEntryPrice && additionalInvestment) {
        liquidationPrice = calculateNewLiquidationPrice(entryPrice, leverage, investment, additionalEntryPrice, additionalInvestment);
    } else {
        liquidationPrice = calculateLiquidationPrice(entryPrice, leverage, investment);
    }

    res.json({ liquidationPrice });
});

function calculateLiquidationPrice(entryPrice, leverage, investment) {
    const maintenanceMargin = 0.005;
    const initialMargin = entryPrice / leverage;
    return entryPrice * (1 - (initialMargin - maintenanceMargin) / entryPrice);
}

function calculateNewLiquidationPrice(entryPrice, leverage, investment, additionalEntryPrice, additionalInvestment) {
    const totalInvestment = investment + additionalInvestment;
    const weightedAverageEntryPrice = ((entryPrice * investment) + (additionalEntryPrice * additionalInvestment)) / totalInvestment;
    const maintenanceMargin = 0.005;
    const initialMargin = weightedAverageEntryPrice / leverage;
    return weightedAverageEntryPrice * (1 - (initialMargin - maintenanceMargin) / weightedAverageEntryPrice);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
