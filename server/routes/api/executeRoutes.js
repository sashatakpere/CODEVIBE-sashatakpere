const rateLimit = require('express-rate-limit');

const executeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many code executions. Please wait a minute before trying again.'
  }
});
// routes/api/executeRoutes.js
const express = require("express");
const { executeCode } = require("../../controller/execute/executeController");

const router = express.Router();

// POST => /api/compiler/:language
router.post('/:language', executeLimiter, executeCode);
module.exports = router;
