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

        // stretch feature to show these network requests on another page
        // also might be able to get bundle size from this info
        // const networkReqs = audits['network-requests'].details.items
        
        return { fcp, lcp, nsl };
    };

    const { url } = req.body;
    try {
        const { fcp, lcp, nsl } = await runLighthouse(url);
        res.locals.metrics.fcp = fcp;
        res.locals.metrics.lcp = lcp;
        res.locals.metrics.nsl = nsl;
        next();
    } catch (error) {
        console.log('error in analyzeUrl controller:', error);
    }
};

module.exports = lighthouseController;