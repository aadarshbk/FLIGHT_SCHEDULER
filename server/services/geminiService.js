const axios = require('axios');

const geminiApiBase = 'https://api.gemini.com/v1'; // Update this to the actual API base URL

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in environment variables');
}

async function callGeminiFunction(functionName, params) {
    try {
        console.log(`Calling Gemini function: ${functionName} with params:`, params);

        const response = await axios.post(
            `${geminiApiBase}/functions/${functionName}`,
            { params },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                },
                timeout: 10000, // Timeout for the request
            }
        );

        return response.data;
    } catch (error) {
        // Enhanced error logging
        if (error.response) {
            console.error(`Gemini API Error (${functionName}):`, error.response.data);
        } else if (error.request) {
            console.error(`No response from Gemini API (${functionName}):`, error.request);
        } else {
            console.error(`Error setting up Gemini API request (${functionName}):`, error.message);
        }

        // Wrap and rethrow the error
        throw new Error(`Failed to call Gemini function: ${functionName}. Error: ${error.message}`);
    }
}

module.exports = { callGeminiFunction };
