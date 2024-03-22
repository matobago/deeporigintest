import express from 'express';
import bodyParser from 'body-parser';

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
    const shortenText = Buffer.from(inputField).toString('base64');
    res.send(`Shorten Text: ${shortenText}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

