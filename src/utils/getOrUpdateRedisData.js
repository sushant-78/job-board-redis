const redisClient = require("../config/redis");

async function getOrUpdateRedisData(key, callback, ttl = 300) {
  const data = await redisClient.get(key);
  if (data) {
    return JSON.parse(data);
  }
  const newData = await callback();
  redisClient.set(key, JSON.stringify(newData), { EX: ttl });
  return newData;
}

module.exports = getOrUpdateRedisData;
