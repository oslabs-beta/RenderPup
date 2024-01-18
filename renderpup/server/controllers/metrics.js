metricsController = {}

metricsController.timeToFirstByte = (req, res, next) => {
  const startTime = new Date()
  fetch(req.body.url)
  .then(() => {
    res.locals.ttfb = new Date() - startTime
    next()
  })
  .catch()

}

module.exports = metricsController;