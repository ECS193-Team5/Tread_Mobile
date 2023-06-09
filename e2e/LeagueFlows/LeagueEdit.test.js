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

  it('Click edit ', async () => {
    await element(by.id('league options')).tap();
    await expect(element(by.id('league edit'))).toBeVisible();
    await expect(element(by.id('league delete'))).toBeVisible();
    await element(by.id('league edit')).tap();
  });

  it('Check Edit ', async () => {
    await expect(element(by.text('Submit')).atIndex(0)).toHaveId("Invalid Edit");
    await element(by.text('Public')).tap();
    await expect(element(by.text('Submit')).atIndex(0)).toHaveId("Valid Edit");
  });

  it('Check if it Changed ', async () => {
    await element(by.text('Submit')).tap();
    await expect(element(by.text('Public'))).toBeVisible()
  });
});
