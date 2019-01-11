const auth = require('../utils/auth');
const db = require('../utils/db');

describe('Explore page', () => {
  beforeAll(async () => {
    await auth.ensureLogin(page);
    // await db.ensureDb();
  });

  it('plots an explore graph', async () => {
    await page.goto('http://localhost:3000/explore?state=%5B%22now-6h%22,%22now%22,%22Prom%22,%22up%22%5D');

    await expect(page).toMatchElement('.explore');
    const renderStart = Date.now();

    await page.waitForRequest(req => req.url().indexOf('query_range'));
    const requestStart = Date.now();
    await page.waitForResponse(response => response.url().indexOf('query_range') > -1 && response.status() === 200);
    const requestEnd = Date.now();
    const requestLatency = (requestEnd - requestStart) / 1000;

    await expect(page).toMatchElement('canvas');
    await expect(page).toMatchElement('.graph-legend-series');
    const renderLatency = (Date.now() - requestEnd) / 1000;

    const metrics = await page.metrics();
    const correctedMetrics = {
      ...metrics,
      RequestDuration: requestLatency,
      RenderDuration: renderLatency,
    }
    console.log(correctedMetrics);
    await db.saveMetrics('explore', correctedMetrics);
  });
});
