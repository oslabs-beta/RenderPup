const db = require('../models/model')

metricsController = {}

metricsController.timeToFirstByte = async (req, res, next) => {
  try {
    let totalTime = 0
    let responseData
    for (let i = 0; i < 1; i++) {
      const startTime = new Date()

      //await keyword pauses for loop where promise chaining did not
        response = await fetch(`${req.body.url}`)
        totalTime += new Date() - startTime
        responseData = response
    }

    //converts fetch response to blob data
    const blobData = await responseData.blob()

    //converts blob data to a readable stream
    const streamData = blobData.stream()

    //gets a reader that can read that can read the readable stream
    const reader = streamData.getReader()

    //reads the readable stream into a uint8array
    const readerData = await reader.read()

    //takes the uint8array and converts each number back into the character they represent
    const integerStrings = readerData.value.toString().split(',');
    const integers = integerStrings.map(value => parseInt(value, 10));
    const characters = integers.map(code => String.fromCharCode(code));
    const resultHtml = characters.join('');

    //stores the ttfb and response html on the res.locals object
    res.locals.data = resultHtml
    res.locals.metrics = {ttfb: totalTime / 1}

    next()
  }
  catch(error) {
    next({log: `invalid url: '${req.body.url}'`, status: 404, message: 'Please enter a valid url'})
  }
}

metricsController.getDatabaseData = async (req, res, next) => {
  console.log('here')
  //Selects all data from the metrics table and attaches the rows to the res.locals object
  const data = await db.query('SELECT * FROM metrics')
  console.log(data.rows)
  res.locals.databaseData = data.rows
  
  next()
}

metricsController.saveMetrics = async (req, res, next) => {
  const { url } = req.body
  const { ttfb, fcp, lcp, nsl } = res.locals.metrics
  res.locals.metrics.date = new Date()
  // console.log('url:', url, 'fcp:', fcp, 'lcp:', lcp);
  // await db.query('INSERT INTO test (url, ttfb, fcp, lcp, date)' + `VALUES ('${url}', ${ttfb}, ${fcp}, ${lcp}, NOW())`);
  await db.query('INSERT INTO metrics (url, ttfb, fcp, lcp, nsl) ' + `VALUES ('${url}', ${ttfb}, ${fcp}, ${lcp}, ${nsl})`);
  next()
};

module.exports = metricsController;