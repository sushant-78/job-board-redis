const asyncHandler = require("express-async-handler");
const jobService = require("../services/jobService");

const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(201).json(job);
});

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getAllJobs();
  res.json(jobs);
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);
  res.json(job);
});

const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.params.id);
  res.status(204).send();
});

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
