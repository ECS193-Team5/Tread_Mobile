describe('Profile Swipe Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Profile Tab', async () => {
        await element(by.label('Profile Nav')).tap()
        await expect(element(by.text('In progress'))).toBeVisible();
        await expect(element(by.text('Completed'))).toBeVisible();
    });

    it('Check In progress', async () => {
        await expect(element(by.text('HIIT 1 hr'))).toBeVisible();
    });

    it('Check Completed', async () => {
        await element(by.text('Completed')).tap();
        await expect(element(by.text('Swim 1 hr'))).toBeVisible();
    });
});