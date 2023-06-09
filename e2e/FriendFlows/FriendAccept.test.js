describe('Friend Accept Flow', () => {
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

    it('Check Accept Friend', async () => {
        await element(by.text('From : ')).atIndex(0).swipe('right');
        await expect(element(by.id('Accept')).atIndex(0)).toBeVisible();
    });
});