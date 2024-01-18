const express = require('express');
const metricsController = require('../controllers/metrics')

const router = express.Router();

router.post('/', metricsController.timeToFirstByte,(req, res) => {
  res.status(200).json({data: res.locals.ttfb})
})

module.exports = router;