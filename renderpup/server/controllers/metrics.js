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
  const performanceScore = res.locals.performanceScore
  // const diagnostics = res.locals.diagnostics
  const opportunities = res.locals.opportunities
  res.locals.metrics.date = new Date()
  await db.query('INSERT INTO metrics (url, ttfb, fcp, lcp, nsl, bs) ' + `VALUES ('${url}', ${ttfb}, ${fcp}, ${lcp}, ${nsl}, '${bundleSize}')`);
  
  await db.query('INSERT INTO diagnostics (performance_score, diagnostics_info) ' + `VALUES (${performanceScore}, '${opportunities}')`)
  next()
};

metricsController.getScriptSize = async (req, res, next) => {

  //takes html text in as a parameter and returns size of each script tag
  async function helpGetSize(html) {
    //initialized variables to be used later on
    const Html = html.split('');
    let startScript = false
    let size = 0;
    let sizes = {'root': 0}
    let start;

    //loops through all html characters
    for (let i = 0; i < Html.length; i++) {
      //if current character is the start of a tag, it will go through to check what tag
      if (Html[i] === '<') {

        //if a starting script tag closes without any attributes we just record the starting point of the content
        //and change a startScript variable to true
        let strSlice = Html.slice(i, i + 8);
        if (strSlice.join('') === '<script>') {
          start = i + 8;
          startScript = true
          continue
        }

        //if the script tag has attrubits within itself we check the tags within
        strSlice = Html.slice(i, i + 7)
        if (strSlice.join('') === '<script') {
          let j = i + 7
          let foundSrc = false

          //we loop forward in the html to find if there is a src tag ot not
          while (!foundSrc) {

            //if there is a src tag we have to get the value it equals
            if (Html.slice(j, j + 3).join('') === 'src') {
              let end = j + 6;
              let totalSource = false

              //iterates forward in the html to find where the src tags value ends
              while (!totalSource) {
                if (Html.slice(end, end + 1).join('') === '"') {
                  totalSource = true
                }
                end++
              }

              //uses the end of the src to make certain fetches to those endpoints
              let response;
              const currSrc = Html.slice(j + 5, end - 1).join('')
              let fetchedUrl;

              //deals with if the src is the complete url to fetch
              if (currSrc[0] === 'h') {
                console.log(currSrc)
                response = await fetch(currSrc)
                fetchedUrl = currSrc
              }

              //deals with a url that just needs https attached to the beginning
              else if (currSrc[0] === '/' && currSrc[1] === '/') {
                console.log(`https:${currSrc}`)
                response = await fetch(`https:${currSrc}`)
                fetchedUrl = `https:${currSrc}`
              }

              //deals with a url that is just attached to the url of the website we are testing
              else {
                const url = req.body.url.split('').slice(0, req.body.url.length - 1).join('')
                console.log(`${url}${currSrc}`)
                response = await fetch(`${url}${currSrc}`)
                fetchedUrl = `${url}${currSrc}`
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

              //adds javascript length to size and sizes variable
              console.log(resultJs.length)
              size += resultJs.length
              sizes[fetchedUrl] = resultJs.length

              //ends the while loop
              foundSrc = true
            }
            
            //if no src attribute is found in the script tag, treats it like a closed tag
            if (Html.slice(j, j + 1).join('') === '>') {
              start = j + 1
              startScript = true
              foundSrc = true
            }
            j++
          }
        }

        //uses the starting point found if there was a closing script tag, and 
        //slices from that start to the current position to get the contents within
        strSlice = Html.slice(i, i + 9);
        if (strSlice.join('') === '</script>') {
          if (startScript) {
            // console.log('end: ',strSlice)
            const thisSize = Html.slice(start, i).join('').length;
            size += thisSize
            sizes.root += thisSize
            start = '';
            startScript = false
          }
        }
      }
    }
    // console.log('sizes: ', sizes)
    return sizes
  }

  try {
    const totalSize = await helpGetSize(res.locals.data)
    console.log('size: ', totalSize)
    res.locals.metrics.bundleSize = JSON.stringify(totalSize)
    next()
  }
  catch {
    next({log: 'Error in getScriptSize middleware', message: 'Error occured in fetching bundle size'})
  }
}

module.exports = metricsController;