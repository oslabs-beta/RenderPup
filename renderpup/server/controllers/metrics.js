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
    res.locals.metrics.url = req.body.url

    next()
  }
  catch(error) {
    next({log: `invalid url: '${req.body.url}'`, status: 404, message: 'Please enter a valid url'})
  }
}

metricsController.getDatabaseData = async (req, res, next) => {
  //Selects all data from the metrics table and attaches the rows to the res.locals object
  const data = await db.query(`SELECT * FROM metrics WHERE url='${req.body.url}/'`)
  res.locals.databaseData = data.rows
  
  next()
}

metricsController.getUrls = async (req, res, next) => {
  //Selects all urls from the metrics table and attaches the rows to the res.locals object
  const data = await db.query('SELECT url FROM metrics')
  res.locals.urls = data.rows
  
  next()
}

metricsController.saveMetrics = async (req, res, next) => {
  const { url } = req.body
  const { ttfb, fcp, lcp, nsl, bundleSize } = res.locals.metrics
  res.locals.metrics.date = new Date()
  await db.query('INSERT INTO metrics (url, ttfb, fcp, lcp, nsl, bs) ' + `VALUES ('${url}', ${ttfb}, ${fcp}, ${lcp}, ${nsl}, ${bundleSize})`);
  next()
};

metricsController.getScriptSize = async (req, res, next) => {

  async function helpGetSize(html) {
    const Html = html.split('');
    // console.log('total size: ', Html.length)
    let startScript = false
    let size = 0;
    let start;
    for (let i = 0; i < Html.length; i++) {
      if (Html[i] === '<') {
        let strSlice = Html.slice(i, i + 8);
        if (strSlice.join('') === '<script>') {
          // console.log('start: ',strSlice)
          start = i + 8;
          startScript = true
          continue
        }
        strSlice = Html.slice(i, i + 7)
        if (strSlice.join('') === '<script') {
          let j = i + 7
          let foundSrc = false
          while (!foundSrc) {
            if (Html.slice(j, j + 3).join('') === 'src') {
              let end = j + 6;
              let totalSource = false
              while (!totalSource) {
                if (Html.slice(end, end + 1).join('') === '"') {
                  totalSource = true
                }
                end++
              }
              let response;
              const currSrc = Html.slice(j + 5, end - 1).join('')
              if (currSrc[0] === 'h') {
                console.log(currSrc)
                response = await fetch(currSrc)
              }
              else if (currSrc[0] === '/' && currSrc[1] === '/') {
                console.log(`https:${currSrc}`)
                response = await fetch(`https:${currSrc}`)
              }
              else {
                const url = req.body.url.split('').slice(0, req.body.url.length - 1).join('')
                console.log(`${url}${currSrc}`)
                response = await fetch(`${url}${currSrc}`)
              }
              
              //converts fetch response to blob data
              const blobData = await response.blob()

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
              const resultJs = characters.join('');

              console.log(resultJs.length)
              size += resultJs.length

              foundSrc = true
            }
            if (Html.slice(j, j + 1).join('') === '>') {
              start = j + 1
              startScript = true
              foundSrc = true
            }
            j++
          }
        }
        strSlice = Html.slice(i, i + 9);
        if (strSlice.join('') === '</script>') {
          if (startScript) {
            // console.log('end: ',strSlice)
            size += Html.slice(start, i).join('').length;
            start = '';
            startScript = false
          }
        }
      }
    }
    return size
  }

  try {
    const totalSize = await helpGetSize(res.locals.data)
    console.log('size: ', totalSize)
    res.locals.metrics.bundleSize = totalSize
    next()
  }
  catch {
    next({log: 'Error in getScriptSize middleware', message: 'Error occured in fetching bundle size'})
  }
}

module.exports = metricsController;