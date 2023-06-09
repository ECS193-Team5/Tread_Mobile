describe('Accept and Reject and Delete sent and received challenges', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Tap on inbox icon', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Received'))).toBeVisible();
    await expect(element(by.text('Sent'))).toBeVisible();
  });

  it('Check Reject Received Challenge', async () => {
    await element(by.text('From : ')).atIndex(0).swipe('left');
    await element(by.id('reject invite')).atIndex(0).toBeVisible();
  });
});
