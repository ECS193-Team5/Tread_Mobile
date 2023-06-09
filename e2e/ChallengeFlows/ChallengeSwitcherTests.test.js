describe('Challenge Switcher Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Current button should be on Screen', async () => {
    await expect(element(by.text('Current'))).toBeVisible();
  });

  it('Test tap to get weekly', async () => {
    await (element(by.text('Current'))).tap();
    await expect(element(by.text('Weekly'))).toBeVisible();
  });

  it('Test tap to get current', async () => {
    await (element(by.text('Weekly'))).tap();
    await expect(element(by.text('Current'))).toBeVisible();
  });
});
