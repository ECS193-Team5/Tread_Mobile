describe('Friend Unblock Flow', () => {
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

    it('Check Blocked Friend', async () => {
        await element(by.text('batman#6380')).atIndex(0).swipe('left');
    });

    it('Unblock Friend', async () => {
        await expect(element(by.id('unblock')).atIndex(0)).toBeVisible();
    });
});