describe('Accept and Reject and Delete sent and received challenges', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Tap on inbox icon', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Received'))).toBeVisible();
    await expect(element(by.text('Sent'))).toBeVisible();
  });

  it('Check Accept Received Challenge', async () => {
    await element(by.text('From : ')).atIndex(0).swipe('right');
    await element(by.id('accept invite')).atIndex(0).toBeVisible();
  });

  it('Go back to main challenge Page', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Current'))).toBeVisible();
  });

  it('Scroll Down to check if its there ', async () => {
    await element(by.id('Challenge Scroll')).scrollTo('bottom')
    await expect(element(by.text('Beach Volleyball 5 ct')).atIndex(0)).toBeVisible();
  });
});
