const express = require("express");
const router = express.Router();

const contributorController = require("../../controller/contributors/contributorController");

router.get("/", contributorController.getLeaderboard);
router.post("/sync", contributorController.syncContributors);

module.exports = router;
