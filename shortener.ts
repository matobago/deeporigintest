import Redis from 'ioredis';

const redis = new Redis();

export async function shorten(inputField: string): Promise<string> {
    const shortenText = Buffer.from(inputField).toString('base64');
    await redis.set(shortenText, inputField);
    return shortenText;
}

