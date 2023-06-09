describe('Add Navigation Test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Add Tab', async () => {
        await element(by.label('Add Nav')).tap()
        await expect(element(by.text('Challenge'))).toBeVisible();
        await expect(element(by.text('Friend'))).toBeVisible();
        await expect(element(by.text('League'))).toBeVisible();
    });

    it('Click on Challenge', async () => {
        await element(by.text('Challenge')).tap()
        await expect(element(by.text('Send')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Log'))).toBeVisible();
        await expect(element(by.text('Send')).atIndex(1)).toHaveId("Invalid Send");
    });

    it('Click on Choose Activity', async () => {
        await element(by.text('Choose an activity')).tap()
        await expect(element(by.text('Enter your own'))).toBeVisible();
    });

    it('Choose Activity', async () => {
        await element(by.text('Aikido')).tap()
        await expect(element(by.text('Aikido'))).toBeVisible();
    });

    // it('Click on Send Challenge', async () => {
    //     await element(by.text('Send')).tap()
    //     await expect(element(by.text('Send'))).toHaveId("Invalid Send");
    // });
});
