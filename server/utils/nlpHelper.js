const nlp = require('compromise');

function extractFlightDetails(message) {
    const doc = nlp(message.toLowerCase());
    const locations = doc.match('#Place').out('array'); // Detect places
    const dates = doc.dates().out('array'); // Detect dates

    return {
        origin: locations[0] || null,
        destination: locations[1] || null,
        date: dates[0] || null,
    };
}

module.exports = { extractFlightDetails };
