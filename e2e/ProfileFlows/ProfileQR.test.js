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
        await expect(element(by.text('Edit'))).toBeVisible();
        await expect(element(by.text('Show QR'))).toBeVisible();
        await expect(element(by.text('Logout'))).toBeVisible();
    });

    it('Click on QR button', async () => {
        await (element(by.text('Show QR'))).tap();
        await expect(element(by.text('Scan to add friend'))).toBeVisible();
    });

    it('Swipe Away QR ', async () => {
        await element(by.text('Scan to add friend')).swipe('down');
        await expect(element(by.text('In progress'))).toBeVisible();
        await expect(element(by.text('Completed'))).toBeVisible();
    });
});