describe('Friend Swipe Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Friends Tab', async () => {
        await element(by.label('Friends Nav')).tap()
        await expect(element(by.text('All Friends'))).toBeVisible();
    });

    it('Tap to blocked', async () => {
        await element(by.text('Blocked')).tap()
        await expect(element(by.text('Blocked Users'))).toBeVisible();
    });

    it('Tap on inbox icon', async () => {
        await (element(by.id('incoming swap'))).tap();
        await expect(element(by.text('Received'))).toBeVisible();
        await expect(element(by.text('Sent'))).toBeVisible();
    });

    it('Tap to Sent', async () => {
        await element(by.text('Sent')).tap()
        // check for sent user
    });

    it('Tap to Receive', async () => {
        await element(by.text('Received')).tap()
        // check for received user
    });

    it('Tap on list icon', async () => {
        await (element(by.id('incoming swap'))).tap();
        await expect(element(by.text('All'))).toBeVisible();
        await expect(element(by.text('Blocked'))).toBeVisible();
    });
});