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
    res.locals.data = resultHtml;
    res.locals.metrics = {ttfb: totalTime / 1};
    res.locals.metrics.url = req.body.url;

    next();
  }
  catch(error) {
    next({log: `invalid url: '${req.body.url}'`, status: 404, message: 'Please enter a valid url'});
  }
}

metricsController.getDatabaseData = async (req, res, next) => {
  //Selects all data from the metrics table and attaches the rows to the res.locals object
  const userId = res.locals.userId;
  const data = await db.query(`SELECT * FROM metrics WHERE url='${req.body.url}/'`);
  // const data = await db.query('SELECT ttfb, fcp, lcp, nsl FROM metrics WHERE url = $1', [url])
  res.locals.databaseData = data.rows;
  
  next()
}

metricsController.getUrls = async (req, res, next) => {
  //Selects all data from the metrics table and attaches the rows to the res.locals object
  const data = await db.query(`SELECT url FROM metrics`)
  // const data = await db.query('SELECT ttfb, fcp, lcp, nsl FROM metrics WHERE url = $1', [url])
  res.locals.urls = data.rows
  
  next()
}

metricsController.saveMetrics = async (req, res, next) => {
  // const userId = req.session.userId;
  // console.log('USER ID RIGHT HERE!!', userId)
  const { url } = req.body
  const { ttfb, fcp, lcp, nsl } = res.locals.metrics
  const performanceScore = res.locals.performanceScore
  // const diagnostics = res.locals.diagnostics
  const opportunities = res.locals.opportunities
  res.locals.metrics.date = new Date()
  await db.query('INSERT INTO metrics (url, ttfb, fcp, lcp, nsl) ' + `VALUES ('${url}', ${ttfb}, ${fcp}, ${lcp}, ${nsl})`);
  
  await db.query('INSERT INTO diagnostics (performance_score, diagnostics_info) ' + `VALUES (${performanceScore}, '${opportunities}')`)
  next()
};

module.exports = metricsController;