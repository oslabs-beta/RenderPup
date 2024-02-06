const db = require('../models/model')

//function to dynamically imprt Lighthouse and Chrome Launder modules
const importLighthouse = async () => {
    const lighthouse = await import('lighthouse');
    const chromeLauncher = await import('chrome-launcher');

    //return both imported modules for use in the controller
    return { lighthouse, chromeLauncher };
  }
//create an object to hold the controller functions 
const lighthouseController = {};

//add a function to anaylze a url using Lighthouse
lighthouseController.analyzeUrl = async (req, res, next) => {
    //inner function to run Lighthouse on a url
    const runLighthouse = async (url) => {
        const { lighthouse, chromeLauncher } = await importLighthouse();
        const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
        const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
        const runnerResult = await lighthouse.default(url, options);
        await chrome.kill();

        //extract the audit results from the Lighthouse report
        const audits = runnerResult.lhr.audits;
        const fcp = audits['first-contentful-paint'].numericValue;
        const lcp = audits['largest-contentful-paint'].numericValue;
        const nsl = audits['network-server-latency'].numericValue;

        //extracting the performance score from the Lighthouse report
        const performanceScore = runnerResult.lhr.categories.performance.score * 100;
        
        //extract the opportunities list from the performance audit
        const opportunities = [];
          if (audits) {
            Object.values(audits).forEach(audit => {
        // Check if the audit is an opportunity and has potential savings
              if (audit.details && audit.details.type === 'opportunity' && audit.score !== 1 && audit.details.overallSavingsMs > 0) {
            opportunities.push(audit.description);
            }
          });
        }
        //return the extracted metrics, performance score, and opportunities 
        return { fcp, lcp, nsl, performanceScore, opportunities };
    };

    const { url } = req.body;

    //running the Lighthouse analysis on the provided url and storing the result on the response object
    try {
        const { fcp, lcp, nsl, performanceScore, opportunities } = await runLighthouse(url);
        res.locals.metrics.fcp = fcp;
        res.locals.metrics.lcp = lcp;
        res.locals.metrics.nsl = nsl;
        res.locals.performanceScore = performanceScore;
        res.locals.opportunities = opportunities;

        //pass control to the next middleware function
        next();
    } catch (error) {
      //log any errors that occur during the Lighthouse analysis process
        console.log('error in analyzeUrl controller:', error);
    }
};

module.exports = lighthouseController;