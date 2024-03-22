"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
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
    res.send(`Text: ${shortenText}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
