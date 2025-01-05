const axios = require('axios');

async function getIATACode(cityName) {
    const apiKey = process.env.AVIATIONSTACK_API_KEY;

    try {
        const response = await axios.get('https://api.aviationstack.com/v1/airports', {
            params: { access_key: apiKey, search: cityName },
        });

        if (response.data && response.data.data.length > 0) {
            return response.data.data[0].iata_code; // Return first matching IATA code
        }
        return null; // Return null if no match is found
    } catch (error) {
        console.error('Error fetching IATA code:', error);
        return null; // Return null in case of an error
    }
}

module.exports = { getIATACode };
