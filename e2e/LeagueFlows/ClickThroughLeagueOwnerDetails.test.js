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

  it('Check member options non friend', async () => {
    await element(by.text('Gggg')).atIndex(0).swipe('right');
    await expect(element(by.id('kick')).atIndex(0)).toBeVisible();
    await expect(element(by.id('ban')).atIndex(0)).toBeVisible();
    await expect(element(by.id('remove admin')).atIndex(0)).toBeVisible();

    await element(by.text('Gggg')).atIndex(0).swipe('left');
    await element(by.text('Gggg')).atIndex(0).swipe('left');

    await expect(element(by.id('add friend')).atIndex(0)).toBeVisible();
    await expect(element(by.id('block')).atIndex(0)).toBeVisible();

    await element(by.text('Gggg')).atIndex(0).swipe('right');
  });

  it('Check member options friend', async () => {
    await element(by.text('KauboyTest')).atIndex(0).swipe('right');
    await expect(element(by.id('kick')).atIndex(1)).toBeVisible();
    await expect(element(by.id('ban')).atIndex(1)).toBeVisible();
    await expect(element(by.id('add admin')).atIndex(0)).toBeVisible();

    await element(by.text('KauboyTest')).atIndex(0).swipe('left');
    await element(by.text('KauboyTest')).atIndex(0).swipe('left');

    await expect(element(by.id('unfriend')).atIndex(0)).toBeVisible();
    await expect(element(by.id('block')).atIndex(1)).toBeVisible();

    await element(by.text('KauboyTest')).atIndex(0).swipe('right');
  });

  it('Check Received', async () => {
    await element(by.text('Received')).tap();
    await expect(element(by.text('From : '))).toBeVisible();
    await element(by.text('From : ')).atIndex(0).swipe('right');
    await expect(element(by.id('accept league invite')).atIndex(0)).toBeVisible();

    await element(by.text('From : ')).atIndex(0).swipe('left');
    await element(by.text('From : ')).atIndex(0).swipe('left');

    await expect(element(by.id('reject league invite')).atIndex(0)).toBeVisible();
  });

  it('Check Sent', async () => {
    await element(by.text('Sent')).tap();
    await expect(element(by.text('To : '))).toBeVisible();
    await element(by.text('To : ')).atIndex(0).swipe('left');
    await expect(element(by.id('reject league invite')).atIndex(0)).toBeVisible();
  });

  it('Check Banned', async () => {
    await element(by.text('Banned')).tap();
    await expect(element(by.text('AwesomeElk'))).toBeVisible();
    await element(by.text('AwesomeElk')).atIndex(0).swipe('left');
    await expect(element(by.id('unban league user')).atIndex(0)).toBeVisible();
  });

  it('Check Add user', async () => {
    await element(by.text('Add User')).tap();
    await expect(element(by.text('Invite to League'))).toBeVisible();
  });


  it('Click edit and delete ', async () => {
    await element(by.id('league options')).tap();
    await expect(element(by.id('league edit'))).toBeVisible();
    await expect(element(by.id('league delete'))).toBeVisible();
  });
});
