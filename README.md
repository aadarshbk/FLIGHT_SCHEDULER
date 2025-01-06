# Flight Scheduling Chatbot with AviationStack API

This project implements a flight scheduling chatbot using Gemini API's function-calling feature and the AviationStack API for flight data. It allows users to retrieve flight schedules and details such as IATA codes for cities.


## Features
- City to IATA Code Mapping: Retrieves IATA codes for given city names using AviationStack API.
- Flight Scheduling: Provides flight details for international flights.
- Integration with Gemini API: Utilizes function-calling for enhanced chatbot functionality.

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Add your `AVATIONSTACK_API_KEY` in a `.env` file.
4. Run the application: `node index.js`

## Example Usage
Retrieve the IATA code for a city:
javascript
const { getIATACode } = require('./server/services/aviationService');
getIATACode('New York').then(console.log);
