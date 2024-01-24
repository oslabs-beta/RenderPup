const express = require('express');
const metricsController = require('../controllers/metrics')
const lighthouseController = require('../controllers/lighthouseController');

const router = express.Router();

//handles getting new website info on go fetch button click
router.post('/', metricsController.timeToFirstByte, lighthouseController.analyzeUrl, metricsController.saveMetrics, (req, res) => {
  res.status(200).json({data: res.locals.metrics, response: res.locals.data})
})

//handles getting database info on page load
router.get('/', metricsController.getDatabaseData, (req, res) => {
  res.status(200).json({data: res.locals.databaseData})
})

module.exports = router;