describe('Click through owner league Details', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Switch to Leagues Tab', async () => {
    await element(by.label('Leagues Nav')).tap()
    await expect(element(by.text('Your Leagues'))).toBeVisible();
  });

  it('Click on League to go to Details', async () => {
    await expect(element(by.text('End to End Owner'))).toBeVisible();
    await element(by.text('End to End Owner')).tap();
  });

  it('Check for correct details', async () => {
    await expect(element(by.text('End to End'))).toBeVisible();
    await expect(element(by.text('Add User'))).toBeVisible();
  });

  it('Scroll through and check members', async () => {
    await element(by.id('user scroll')).scrollTo('bottom')
    await expect(element(by.text('Kauboy'))).toBeVisible();
  });

  it('Check challenges', async () => {
    await element(by.text('Challenges')).atIndex(0).tap();
    await expect(element(by.id('zero item'))).toBeVisible();
  });

  it('Check Leaderboard', async () => {
    await element(by.text('Leaderboard')).tap();
    await expect(element(by.id('zero item'))).toBeVisible();
  });

  it('Click QR', async () => {
    await element(by.id('league qr')).tap();
    await expect(element(by.text('Scan to join'))).toBeVisible();
  });

  it('Swipe Away QR ', async () => {
    await element(by.text('Scan to join')).swipe('down');
    await expect(element(by.text('End to End'))).toBeVisible();
  });

  it('Click edit and delete ', async () => {
    await element(by.id('league options')).tap();
    await expect(element(by.id('league edit'))).toBeVisible();
    await expect(element(by.id('league delete'))).toBeVisible();
  });
});
