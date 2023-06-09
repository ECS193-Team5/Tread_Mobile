describe('Profile QR Flow', () => {
  beforeAll(async () => {
      await device.launchApp();
  });

  it('Switch to Profile Tab', async () => {
      await element(by.label('Profile Nav')).tap()
      await expect(element(by.text('In progress'))).toBeVisible();
      await expect(element(by.text('Completed'))).toBeVisible();
  });

  it('Click on Settings button', async () => {
      await (element(by.id('settings'))).tap();
      await expect(element(by.id('edit clickable'))).toBeVisible();
      await expect(element(by.id('logout clickable'))).toBeVisible();
      await expect(element(by.id('qr clickable'))).toBeVisible();
  });

  it('Click on edit button', async () => {
      await (element(by.id('edit clickable'))).tap();
      await expect(element(by.text('Delete Account'))).toBeVisible();
  });

  it('Type change', async () => {
      await expect(element(by.text('Update Profile')).atIndex(0)).toHaveId("Invalid Edit");
      await element(by.id('input')).typeText("Testing")
      await expect(element(by.text('KauboyTesting'))).toBeVisible();
      await expect(element(by.text('Update Profile')).atIndex(0)).toHaveId("Valid Edit");
  });

  it('Submit', async () => {
    await element(by.text('Update Profile')).atIndex(0).tap();
  });

  it('Check', async () => {
    await expect(element(by.text('KauboyTesting'))).toBeVisible();
  });
});