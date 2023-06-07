describe('Accept and Reject and Delete sent and received challenges', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Tap on inbox icon', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Received'))).toBeVisible();
    await expect(element(by.text('Sent'))).toBeVisible();
  });

  it('Check Delete Sent Challenge', async () => {
    await (element(by.text('Sent'))).tap();
    await element(by.text('To : ')).atIndex(0).swipe('left');
    await element(by.id('reject invite')).atIndex(0).tap();
  });
});
