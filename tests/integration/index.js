jest.setTimeout(10 * 1000);

const handleError = () => page.screenshot({ path: 'screenshot.png' });
/*
describe('Google', () => {
  beforeAll(async () => {
    // Login
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.login form');
    await page.type('input[name="username"]', 'admin');
    await page.type('input[name="password"]', 'admin');
    await page.click('.login-button-group button[type="submit"]');
    // Wait until next form appears and login works
    await page.waitForSelector('#change-password-view');
    await page.waitFor(1000);
    const metrics = await page.metrics();
    console.log(metrics);
  });

  it('Plot graph', async () => {
    try {
      await page.goto('http://localhost:3000/explore?state=%5B%22now-6h%22,%22now%22,%22Prom%22,%22up%22%5D');
      await page.waitForSelector('.main-view');
      // Series have been plotted
      await page.waitForSelector('canvas');
      await page.screenshot({ path: 'screenshot.png' });
      const metrics = await page.metrics();
      console.log(metrics);
    } catch (error) {
      await page.screenshot({ path: 'screenshot.png' });
    }
  });
});
*/
