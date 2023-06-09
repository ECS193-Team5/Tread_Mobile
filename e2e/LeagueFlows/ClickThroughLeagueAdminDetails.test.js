describe('Click through admin league Details', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Switch to Leagues Tab', async () => {
    await element(by.label('Leagues Nav')).tap()
    await expect(element(by.text('Your Leagues'))).toBeVisible();
  });

  it('Click on League to go to Details', async () => {
    await expect(element(by.text('End to End Admin'))).toBeVisible();
    await element(by.text('End to End Admin')).tap();
  });

  it('Check for correct details', async () => {
    await expect(element(by.text('End to end'))).toBeVisible();
    await expect(element(by.text('Add User'))).toBeVisible();
  });

  it('Scroll through and check members', async () => {
    await element(by.id('user scroll')).scrollTo('bottom')
    await expect(element(by.text('SocialFitness#1786'))).toBeVisible();
  });

  it('Check remove admin', async () => {
    await element(by.text('SocialFitness#1786')).atIndex(0).swipe('left');
    await expect(element(by.id('remove self admin')).atIndex(0)).toBeVisible();
  });

  it('Click Leave ', async () => {
    await element(by.id('league options')).tap();
    await expect(element(by.id('league leave'))).toBeVisible();
  });
});
