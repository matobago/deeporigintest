import Redis from 'ioredis';
const express = require('express');
const { Request, Response } = require('express');
const bodyParser = require('body-parser');
const { shorten } = require('./shortener');
const redis = new Redis();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/shorten" method="POST">
            <label for="inputField">Enter URL:</label>
            <input type="text" id="inputField" name="inputField">
            <button type="submit">Shorten</button>
        </form>
    `);
});

app.get('/:shortenURL', async (req, res) => {
	const shortenURL = req.params.shortenURL;
	const keyExist = await redis.exists(shortenURL);

	if (keyExist) {
		const valueURL = await redis.get(shortenURL);
		res.redirect(valueURL);
	} else {
		res.status(404).send('URL not Found');
	}
});

app.post('/shorten', async (req, res) => {
    try {
        const RENEW_KEY_ATTEMPTS = 10000;
        const inputField = req.body.inputField;

	let count = 0;
	let keyExist = 0;
	let shortenText: string;

	do {
        	shortenText = shorten(inputField);  
		keyExist = await redis.exists(shortenText);
		count++;
	} while ((keyExist === 1) && count < RENEW_KEY_ATTEMPTS); 
	
	if (keyExist === 1) {
		res.status(409).json({ error: `${RENEW_KEY_ATTEMPTS} to generate key` });
		return;
	}

	await redis.set(shortenText, inputField);
        res.status(201).send(`Shorten URL: http://short.ly/${shortenText}`);

    } catch (error) {

        console.error('Error occurred while shortening URL:', error);
        res.status(500).send('Internal Server Error');  
	return;
    }
});

if(require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

export default app;
