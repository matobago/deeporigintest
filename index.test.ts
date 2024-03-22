import request from 'supertest';
import app from './index'; // assuming your server setup is in index.ts

describe('GET /', () => {
    it('responds with 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

describe('POST /shorten', () => {
    it('encodes the input text', async () => {
        const inputText = 'http://example.com/onetwothree';
        const response = await request(app)
            .post('/shorten')
            .send({ inputField: inputText });
        expect(response.status).toBe(200);
        expect(response.text).toContain('Shorten Text:');
    });
});

