const express = require('express');
const metricsController = require('../controllers/metrics')

const router = express.Router();

router.post('/', metricsController.timeToFirstByte, (req, res) => {
  res.status(200).json({data: res.locals.ttfb, response: res.locals.data})
})

module.exports = router;