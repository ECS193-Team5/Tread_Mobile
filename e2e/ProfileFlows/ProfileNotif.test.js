describe('Profile Notif Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Profile Tab', async () => {
        await element(by.label('Profile Nav')).tap()
        await expect(element(by.text('In progress'))).toBeVisible();
        await expect(element(by.text('Completed'))).toBeVisible();
    });

    it('Click on inbox button', async () => {
        await (element(by.id('incoming swap'))).tap();
        await expect(element(by.text('Notifications'))).toBeVisible();
    });

    it('Clear Inbox', async () => {
        await (element(by.text('Clear All'))).tap();
        await expect(element(by.text('No notifications'))).toBeVisible();
    });

    it('Click back to profile', async () => {
        await (element(by.id('incoming swap'))).tap();
        await expect(element(by.text('In progress'))).toBeVisible();
        await expect(element(by.text('Completed'))).toBeVisible();
    });

});