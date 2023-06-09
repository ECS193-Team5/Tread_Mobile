describe('Friend Reject Flow', () => {
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
    });

    it('Check Reject Friend', async () => {
        await element(by.text('KauboyTest')).atIndex(0).swipe('right');
    });

    it('Reject Friend', async () => {
        await element(by.id('Reject')).atIndex(0).toBeVisible();
    });
});