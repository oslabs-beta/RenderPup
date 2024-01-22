const express = require('express');
const metricsController = require('../controllers/metrics')
const lighthouseController = require('../controllers/lighthouseController');


const router = express.Router();

// router.get('/', metricsController.timeToFirstByte,(req, res) => {
//   res.status(200).json({data: res.locals.ttfb})
// })

router.post('/', lighthouseController.analyzeUrl,(req, res) => {
  res.status(200).json({data: res.locals.saveMetrics})
});

router.post('/history/:url', lighthouseController.getMetricsHistory,(req, res) => {
  res.status(200).json({data: res.locals.getMetrics})
});

module.exports = router;