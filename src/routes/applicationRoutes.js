const express = require("express");
const router = express.Router();
const controller = require("../controllers/applicationController");

router.post("/:jobId/apply", controller.apply);
router.get("/:jobId/applications", controller.getApplications);

module.exports = router;
