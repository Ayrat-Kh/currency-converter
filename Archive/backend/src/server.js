const express= require('express');
const app = express();
const port = 3077;

const rates1 = require('./rates1.json');
const rates2 = require('./rates2.json');
const currencies = require('./currencies.json');

function handleApiResponse(req, response, data) {
    const random = Math.floor(Math.random() * 20);
    response.header('Access-Control-Allow-Origin', '*');
    if (random === 0) {
        response.status(500).send('Internal Server Error');
    } else {
        response.json({
            message: 'Success',
            value: data
        });
    }
}

app.use((req, response, next) => {
    const randomDelay = Math.floor(Math.random() * 700 + 50);
    setTimeout(() => {
        next();
    }, randomDelay);
});

app.get('/', (req, response) => {
    const data = { message: 'Welcome!' };
    response.json(data);
});

app.get('/api/currencies', (req, response) => {
    handleApiResponse(req, response, currencies);
});

app.get('/api/rates', (req, response) => {
    const randomValue = Math.random();
    const chosenRates = randomValue < 0.5 ? rates1 : rates2;
    handleApiResponse(req, response, chosenRates);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
