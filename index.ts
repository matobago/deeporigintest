import express from 'express';
import bodyParser from 'body-parser';
import app from '/.shortener';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/shorten" method="POST">
            <label for="inputField">Enter Text:</label>
            <input type="text" id="inputField" name="inputField">
            <button type="submit">Shorten</button>
        </form>
    `);
});

app.post('/shorten', (req, res) => {
    const inputField = req.body.inputField;
    const shortenText = await shorten(inputField);
    res.send(`Shorten Text: ${shortenText}`);
});

if(require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

export default app;


