const model = require("../models/applicationModel");

const createApplication = async (data) => {
  return await model.createApplication(data);
};

const getApplicationsByJobId = async (jobId) => {
  return await model.getApplicationsByJobId(jobId);
};

module.exports = { createApplication, getApplicationsByJobId };
