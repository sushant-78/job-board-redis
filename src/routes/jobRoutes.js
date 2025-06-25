const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, jobController.createJob);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", protect, jobController.updateJob);
router.delete("/:id", protect, jobController.deleteJob);

module.exports = router;
