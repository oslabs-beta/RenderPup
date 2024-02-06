const db = require('../models/model')

const importLighthouse = async () => {
    const lighthouse = await import('lighthouse');
    const chromeLauncher = await import('chrome-launcher');

    return { lighthouse, chromeLauncher };
  }
const lighthouseController = {};

lighthouseController.analyzeUrl = async (req, res, next) => {
    const runLighthouse = async (url) => {
        const { lighthouse, chromeLauncher } = await importLighthouse();
        const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
        const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
        const runnerResult = await lighthouse.default(url, options);
        await chrome.kill();

        const audits = runnerResult.lhr.audits;
        const fcp = audits['first-contentful-paint'].numericValue;
        const lcp = audits['largest-contentful-paint'].numericValue;
        const nsl = audits['network-server-latency'].numericValue;

        //new
        const performanceScore = runnerResult.lhr.categories.performance.score * 100;
        
        const opportunities = [];
          if (audits) {
            Object.values(audits).forEach(audit => {
            // Check if the audit is an opportunity and has potential savings
              if (audit.details && audit.details.type === 'opportunity' && audit.score !== 1 && audit.details.overallSavingsMs > 0) {
            opportunities.push(audit.description);
            }
          });
        }

        // stretch feature to show these network requests on another page
        // also might be able to get bundle size from this info
        // const networkReqs = audits['network-requests'].details.items

        console.log('FCP:', fcp, 'LCP:', lcp, 'NSL:', nsl, 'Performance Score:', performanceScore)
        return { fcp, lcp, nsl, performanceScore, opportunities };
    };

    const { url } = req.body;
    try {
        const { fcp, lcp, nsl, performanceScore, opportunities } = await runLighthouse(url);
        res.locals.metrics.fcp = fcp;
        res.locals.metrics.lcp = lcp;
        res.locals.metrics.nsl = nsl;
        res.locals.performanceScore = performanceScore;
        res.locals.opportunities = opportunities;
        next();
    } catch (error) {
        console.log('error in analyzeUrl controller:', error);
    }
};

module.exports = lighthouseController;