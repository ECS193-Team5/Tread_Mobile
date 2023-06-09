
describe('Scroll through Current Challenges and check leaderboard', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Scroll Down ', async () => {
    await element(by.id('Challenge Scroll')).scroll(200, 'down')
    await expect(element(by.text('Bocce 1 ct'))).toBeVisible();
  });

  it('Scroll Up ', async () => {
    await element(by.id('Challenge Scroll')).scrollTo('top')
    await expect(element(by.text('Badminton 5 hr')).atIndex(0)).toBeVisible();
  });

  it('Tap Challenge ', async () => {
    await element(by.text('Baseball 6 hr')).tap();
    await expect(element(by.text('League Challenge'))).toBeVisible();
    await expect(element(by.text('SocialFitness#1786'))).toBeVisible();
  });

  it('Swipe Away Leaderboard ', async () => {
    await element(by.text('League Challenge')).swipe('down');
    await expect(element(by.text('Current'))).toBeVisible();
  });
});