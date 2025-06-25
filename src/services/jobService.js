const jobModel = require("../models/jobModel");
const getOrUpdateRedisData = require("../utils/getOrUpdateRedisData");

const createJob = async (data) => {
  const job = await jobModel.createJob(data);
  await redisClient.del("jobs:all");
  return job;
};

const getAllJobs = async () => {
  return await getOrUpdateRedisData("jobs:all", async () => {
    return await jobModel.getAllJobs();
  });
};

const getJobById = async (id) => {
  const job = await jobModel.getJobById(id);
  if (!job) {
    throw new Error("Job not found");
  }
  return job;
};

const updateJob = async (id, data) => {
  const job = await jobModel.updateJob(id, data);
  if (!job) {
    throw new Error("Job not found or update failed");
  }
  await redisClient.del("jobs:all");
  return job;
};

const deleteJob = async (id) => {
  await jobModel.deleteJob(id);
  await redisClient.del("jobs:all");
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
