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
        //await element(by.text('From : ')).atIndex(0).swipe('left');
        await expect(element(by.id('unblock')).atIndex(0)).toBeVisible();
    });

    it('Unblock Friend', async () => {
        await element(by.id('unblock')).atIndex(0).tap();
        // click on confirm
    });
});