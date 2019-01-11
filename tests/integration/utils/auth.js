async function login(page) {
  await expect(page).toFillForm('.login form', {
    username: 'admin',
    password: 'admin',
  });
  await expect(page).toClick('button[type="submit"]');
  await page.waitForResponse(response => response.url() === 'http://localhost:3000/login' && response.status() === 200);
}

async function ensureLogin(page) {
  await page.goto('http://localhost:3000/');
  if (page.url().indexOf('login') > -1) {
    console.log('Redirected to login page. Logging in...');
    await login(page);
  }
}

module.exports = {
  ensureLogin,
  login,
};
