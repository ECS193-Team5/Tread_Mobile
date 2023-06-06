describe('Incoming Challenge Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Current button should be on Screen', async () => {
    await expect(element(by.text('Current'))).toBeVisible();
  });

  it('Tap on inbox icon', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Received'))).toBeVisible();
    await expect(element(by.text('Sent'))).toBeVisible();
  });

  it('Check Received Challenge', async () => {
    await expect(element(by.text('From : '))).toBeVisible();
  });

  it('Check Sent Challenge', async () => {
    await (element(by.text('Sent'))).tap();
    await expect(element(by.text('To : '))).toBeVisible();
  });

  it('Go back to main challenge Page', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Current'))).toBeVisible();
  });
});
