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
        // console.log(lighthouse.default.lighthouse)
        const runnerResult = await lighthouse.default(url, options);
        // console.log(runnerResult);
        await chrome.kill();

        const audits = runnerResult.lhr.audits;
        const fcp = audits['first-contentful-paint'].numericValue;
        const lcp = audits['largest-contentful-paint'].numericValue;
        console.log('FCP:', fcp, 'LCP:', lcp)
        return { fcp, lcp };
    };

    const saveMetrics = async (url, fcp, lcp) => {
        // await pool.query('query to send data to database', [url, fcp, lcp]);
    };

    const { url } = req.body;
    try {
        const { fcp, lcp } = await runLighthouse(url);
        res.locals.saveMetrics = saveMetrics(url, fcp, lcp);
        next();
    } catch (error) {
        console.log('error in analyzeUrl controller:', error);
    }
};

lighthouseController.getMetricsHistory = async (req, res) => {
    const getMetricsHistory = async (url) => {
        const { rows } = await pool.query('query to get data from database', [url]);
        return rows;
    };

    const { url } = req.params;
    try {
        res.locals.getMetrics = getMetricsHistory(url);
        next();
    } catch (error) {
        console.log('Error in getMetricsHistory controller:', error);
    }
};

module.exports = lighthouseController;