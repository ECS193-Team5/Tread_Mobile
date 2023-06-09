describe('Check for Leagues and Admin Leagues', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Switch to Leagues Tab', async () => {
    await element(by.label('Leagues Nav')).tap()
    await expect(element(by.text('Your Leagues'))).toBeVisible();
  });

  it('Check for Leagues', async () => {
    await expect(element(by.text('justice!!!'))).toBeVisible();
  });

  it('Tap on Admin Tab and Check admin League', async () => {
    await (element(by.text('Admin'))).aap();
    await expect(element(by.text('Test League'))).toBeVisible();
  });
});
