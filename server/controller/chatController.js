async function handleChat(req, res) {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const flightDetails = extractFlightDetails(userMessage);
        const flightData = await getFlightData(flightDetails);

        if (flightData.length > 0) {
            return res.status(200).json({ message: 'Flights found', data: flightData });
        } else {
            return res.status(200).json({ message: 'No flights available' });
        }
    } catch (error) {
        console.error('[ERROR]', error.message || error);
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
}

module.exports = { handleChat };
