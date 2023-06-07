describe('Friend Delete Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Friends Tab', async () => {
        await element(by.label('Friends Nav')).tap()
        await expect(element(by.text('All Friends'))).toBeVisible();
    });

    it('Tap on inbox icon', async () => {
      await (element(by.id('incoming swap'))).tap();
      await expect(element(by.text('Received'))).toBeVisible();
      await expect(element(by.text('Sent'))).toBeVisible();
      await element(by.text('Sent')).tap();
  });

    it('Check Delete Friend', async () => {
        await element(by.text('KauboyTest')).atIndex(0).swipe('left');
        await expect(element(by.id('Reject')).atIndex(0)).toBeVisible();
    });

    it('Delete Friend', async () => {
        await element(by.id('Reject')).atIndex(0).tap();
        // click on confirm
    });


});