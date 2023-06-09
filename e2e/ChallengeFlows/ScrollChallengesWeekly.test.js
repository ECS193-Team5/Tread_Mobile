
describe('Scroll through Weekly Challenges and check leaderboard', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Tap to weekly ', async () => {
    await (element(by.text('Current'))).tap();
    await expect(element(by.text('Swim 5 hr'))).toBeVisible();
  });

  it('Tap Challenge ', async () => {
    await element(by.text('Swim 5 hr')).atIndex(0).tap();
    await expect(element(by.text('Global Challenge'))).toBeVisible();
    await expect(element(by.text('batman#6380'))).toBeVisible();
  });

  it('Swipe Away Leaderboard ', async () => {
    await element(by.text('Global Challenge')).swipe('down');
    await expect(element(by.text('Weekly'))).toBeVisible();
  });
});