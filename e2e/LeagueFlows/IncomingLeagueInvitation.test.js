describe('Check for Leagues and Admin Leagues', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Switch to Leagues Tab', async () => {
    await element(by.label('Leagues Nav')).tap()
    await expect(element(by.text('Your Leagues'))).toBeVisible();
  });

  it('Swap to Incoming', async () => {
    await (element(by.id('incoming swap'))).tap();
    await expect(element(by.text('Received'))).toBeVisible();
    await expect(element(by.text('Sent'))).toBeVisible();
  });

  it('Check Received Challenge', async () => {
    await expect(element(by.text('From : ')).atIndex(0)).toBeVisible();
    await element(by.text('From : ')).atIndex(0).swipe('right');

    await expect(element(by.id('accept league group invite')).atIndex(0)).toBeVisible();

    await element(by.text('From : ')).atIndex(0).swipe('left');
    await element(by.text('From : ')).atIndex(0).swipe('left');

    await expect(element(by.id('reject league group invite')).atIndex(0)).toBeVisible();
  });

  it('Check Sent Challenge', async () => {
    await (element(by.text('Sent'))).tap();
    await expect(element(by.text('To : ')).atIndex(0)).toBeVisible();
    await element(by.text('To : ')).atIndex(0).swipe('left');

    await expect(element(by.id('reject league group invite')).atIndex(0)).toBeVisible();

  });
});
