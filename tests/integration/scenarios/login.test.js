const constants = require('../constants');

// New browser context for logins seems to take a bit longer
jest.setTimeout(10000);

describe('Login page', () => {
  const globalPage = page;
  page = undefined;

  beforeAll(async () => {
    // Create a new page in a pristine context.
    const browser = globalPage.browser();
    const incognitoContext = await browser.createIncognitoBrowserContext();
    page = await incognitoContext.newPage();
  });

  it('displays the login page', async () => {
    // Login
    await page.goto('http://localhost:3000/');
    await expect(page).toMatchElement('.login form');
    await expect(page).toFillForm('.login form', {
      username: 'admin',
      password: 'admin',
    });
    await expect(page).toClick('button[type="submit"]');

    // Ensuring login request returned
    await page.waitForResponse(response => response.url() === 'http://localhost:3000/login' && response.status() === 200);

    // Move to root again to check if logged in
    await page.goto('http://localhost:3000/');
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page).toMatchElement('.dashboard-container');
  });
});
