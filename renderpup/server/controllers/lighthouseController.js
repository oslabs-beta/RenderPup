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
        // console.log(lighthouse.default)
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
        console.log('url:', typeof url, 'fcp:', fcp, 'lcp:', lcp);
        // const text = `INSERT INTO test (fcp, lcp) VALUES ($1, $2)`;
        // const params = [ fcp, lcp ];
        // await db.query(text, params);
        await db.query('INSERT INTO test (url, fcp, lcp)' + `VALUES ('${url}',${fcp}, ${lcp})`);
        // await db.query('INSERT INTO test (url, fcp, lcp) VALUES ($1, $2, $3)', [url, fcp, lcp]);
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

lighthouseController.getMetricsHistory = async (req, res, next) => {
    console.log('req.params:', req.params);
    const { url } = req.params;
    // const getMetricsHistory = async (url) => {
    //     console.log("url:", url);
    //     const { rows } = await db.query('SELECT fcp FROM test' + `WHERE url = '${url}'`);
    //     console.log("rows:" , rows);
    //     return rows;
    // };

    try {
        // const { rows } = await db.query('SELECT fcp FROM test' + `WHERE url = '${url}'`);
        const { rows } = await db.query('SELECT fcp FROM test WHERE url = $1', [url]);
        res.locals.getMetrics = rows;
        next();
    } catch (error) {
        console.log('Error in getMetricsHistory controller:', error);
    }
};

module.exports = lighthouseController;