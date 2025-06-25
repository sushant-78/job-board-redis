const asyncHandler = require("express-async-handler");
const service = require("../services/applicationService");

const apply = asyncHandler(async (req, res) => {
  const application = await service.createApplication({
    jobId: req.params.jobId,
    applicantName: req.body.applicantName,
    applicantEmail: req.body.applicantEmail,
    resumeUrl: req.body.resumeUrl,
    coverLetter: req.body.coverLetter,
    createdBy: req.body.createdBy, // For now, passing from body (no auth yet)
  });
  res.status(201).json(application);
});

const getApplications = asyncHandler(async (req, res) => {
  const applications = await service.getApplicationsByJobId(req.params.jobId);
  res.json(applications);
});

module.exports = { apply, getApplications };
