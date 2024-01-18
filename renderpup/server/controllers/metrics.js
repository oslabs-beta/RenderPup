metricsController = {}

metricsController.timeToFirstByte = (req, res, next) => {
  const startTime = new Date()
  fetch('https://www.amazon.com/')
  .then(() => {
    res.locals.ttfb = new Date() - startTime
    next()
  })

}

module.exports = metricsController;