const redisClient = require('./../redisClient');

module.exports = async () => {
        redisClient.quit();
};

