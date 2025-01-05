const express = require('express');
const { getFlightData } = require('../services/aviationStackHelper');
const router = express.Router();

router.get('/api/flights', async (req, res) => {
    try {
        const { origin, destination, date } = req.query;
        const flightData = await getFlightData({ origin, destination, date });
        res.json({ message: 'Flight data retrieved successfully', data: flightData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving flight data', error: error.message });
    }
});

module.exports = router;
