const redis = require("redis");
const { redisUrl } = require("./env");

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.on("connect", () => {
  // console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  // console.error("Redis error:", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
