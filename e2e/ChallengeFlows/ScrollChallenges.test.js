
describe('Scroll through Current Challenges and check leaderboard', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Scroll Down ', async () => {
    await element(by.id('Challenge Scroll')).scrollTo('bottom')
    await expect(element(by.text('Aikido 488 ct'))).toBeVisible();
   
  });

  it('Scroll Up ', async () => {
    await element(by.id('Challenge Scroll')).scrollTo('top')
    await expect(element(by.text('Badminton 5 hr')).atIndex(0)).toBeVisible();
  });

  it('Tap Challenge ', async () => {
    await element(by.text('Baseball 6 hr')).atIndex(1).tap();
    await expect(element(by.text('League Challenge'))).toBeVisible();
    await expect(element(by.text('KaushikTest#4388'))).toBeVisible();
  });

  it('Swipe Away Leaderboard ', async () => {
    await element(by.text('League Challenge')).swipe('down');
    await expect(element(by.text('Current'))).toBeVisible();
  });
});