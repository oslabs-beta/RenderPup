const express = require('express');
const metricsController = require('../controllers/metrics')
const lighthouseController = require('../controllers/lighthouseController');
const userController = require('../controllers/userController');

const router = express.Router();

//handles getting new website info on go fetch button click
router.post('/', metricsController.timeToFirstByte, lighthouseController.analyzeUrl, metricsController.saveMetrics, (req, res) => {
  return res.status(200).json({data: {metrics: res.locals.metrics, opportunities: res.locals.opportunities, performanceScore: res.locals.performanceScore}, response: res.locals.data})
})

router.get('/', metricsController.getUrls, (req, res) => {
  return res.status(200).json({urls: res.locals.urls})
})

//handles getting database info on page load
router.post('/urls', metricsController.getDatabaseData, (req, res) => {
  return res.status(200).json({data: res.locals.databaseData})
})

router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.passwordMatches)
})

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.userCreated)
})


module.exports = router;