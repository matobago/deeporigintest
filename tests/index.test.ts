const request = require('supertest');
import app from './../index'; 
import Redis from 'ioredis';
const redis = new Redis();

describe('GET /', () => {
    it('responds with 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

describe('GET /:shortenText', () => {
    it('redirects to original URL if key exists', async () => {
        const originalUrl = 'http://short.ly/original-url';
        const shortenText = 'abc123';

	await redis.set(shortenText, originalUrl);

        const response = await request(app).get(`/${shortenText}`);

        expect(response.status).toBe(302);
        expect(response.header['location']).toBe(originalUrl);
    });

    it('responds with 404 if key does not exist', async () => {
        const shortenText = 'nonexistentkey';

        jest.spyOn(redis, 'exists').mockResolvedValue(0);

        const response = await request(app).get(`/${shortenText}`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('URL not Found');

    });

    afterAll(async () => {
        await redis.quit();
    });
});

describe('POST /shorten', () => {
    it('encodes the input text', async () => {
	const inputText = 'http://example.com/onetwothree';
	const response = await request(app)
	    .post('/shorten')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .send({ inputField: encodeURIComponent(inputText) });

	expect(response.status).toBe(201);
	expect(response.text).toMatch(/Shorten URL: http:\/\/short\.ly\/[a-zA-Z0-9]+/);
    });
});


