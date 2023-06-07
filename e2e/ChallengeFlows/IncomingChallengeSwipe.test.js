describe('Incoming Challenge Swipe Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Swipe to go to Incoming page', async () => {
    await element(by.text('Current')).swipe('left');
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
    await element(by.text('Received')).swipe('right');
    await expect(element(by.text('Current'))).toBeVisible();
  });
});