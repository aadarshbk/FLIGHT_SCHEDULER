async function getFlightSchedule(req, res) {
    const { origin, destination, date } = req.query;

    if (!origin || !destination || !date) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const schedule = await callGeminiFunction('getFlightSchedule', {
            origin,
            destination,
            date,
        });
        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching flight schedule:', error.message);
        res.status(500).json({ error: 'Failed to fetch flight schedule' });
    }
}
