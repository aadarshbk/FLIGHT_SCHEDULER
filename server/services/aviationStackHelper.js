const axios = require('axios');
const nlp = require('compromise');

async function getFlightData(params) {
    try {
        const apiKey = process.env.AVIATIONSTACK_API_KEY;
        if (!apiKey) {
            throw new Error('Missing AVIATIONSTACK_API_KEY in environment variables');
        }

        const baseURL = 'http://api.aviationstack.com/v1/flights';
        console.log(`[INFO] Fetching flight data with params:`, params);

        const response = await axios.get(baseURL, {
            params: { ...params, access_key: apiKey },
        });

        if (response.data && response.data.error) {
            throw new Error(`AviationStack API Error: ${response.data.error.info}`);
        }

        return response.data.data || [];
    } catch (error) {
        console.error(`[ERROR] Failed to fetch flight data: ${error.message}`);
        throw new Error('Failed to fetch flight data');
    }
}

function extractFlightDetails(message) {
    try {
        console.log(`[INFO] Extracting flight details from message: "${message}"`);

        const doc = nlp(message);
        const locations = doc.match('#Place').out('array');
        const date = doc.match('#Date').out('text');

        if (locations.length < 2) {
            throw new Error('Unable to identify origin and destination');
        }

        const details = {
            origin: locations[0],
            destination: locations[1],
            date: date || new Date().toISOString().split('T')[0], // Default to today's date
        };

        console.log(`[DEBUG] Extracted flight details:`, details);
        return details;
    } catch (error) {
        console.error(`[ERROR] Failed to extract flight details: ${error.message}`);
        throw new Error('Failed to extract flight details');
    }
}

module.exports = { getFlightData, extractFlightDetails };
