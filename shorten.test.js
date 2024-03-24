import { Request, Response } from 'express';
import { shorten } from './shorten';

describe('shorten', () => {
    it('should shorten input field with 201 code if key not exist', async () => {
        const req = { body: { inputField: 'example.com' } } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await shorten(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ shortenText: expect.any(String) });
    });

    it('should respond with 409 code if key already exists', async () => {
        const req = { body: { inputField: 'example.com' } } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        // Mock the behavior of redis.exists() to return true
        (redis as any).exists = jest.fn().mockResolvedValue(true);

        await shorten(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: 'Shorten key already exists' });
    });

    it('should respond with 500 code if internal server error', async () => {
        const req = { body: { inputField: 'example.com' } } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        // Mock the behavior of redis.exists() to throw an error
        (redis as any).exists = jest.fn().mockRejectedValue(new Error('Internal server error'));

        await shorten(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });

    it('should respond with 400 code if request body is missing', async () => {
        const req = {} as Request; // Missing request body
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await shorten(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid request body' });
    });
});

