describe('Join League Test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Add Tab', async () => {
        await element(by.label('Add Nav')).tap()
        await expect(element(by.text('Challenge'))).toBeVisible();
        await expect(element(by.text('Friend'))).toBeVisible();
        await expect(element(by.text('League'))).toBeVisible();
    });

    it('Click on League', async () => {
        await element(by.text('League')).tap()
        await expect(element(by.text('Create'))).toBeVisible();
        await expect(element(by.text('Join'))).toBeVisible();
    });

    it('Click on Join', async () => {
        await element(by.text('Join')).tap()
        await expect(element(by.text('Join League'))).toBeVisible();
    });
});
