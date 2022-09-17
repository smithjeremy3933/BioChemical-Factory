const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const LogController = require("../controllers/logController")

router.use(requireAuth);

router.get("/api/logs/highestPriority", LogController.getHighestProrityLogs);

module.exports = router;