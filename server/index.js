const express = require('express');
const chatRoutes = require('./routes/chat');
const flightsRoutes = require('./routes/flights');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('src')); // Serving static files from 'src'

app.use('/api/chat', chatRoutes);
app.use('/api/flights', flightsRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
