describe('Add Navigation Test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Profile Tab', async () => {
        await element(by.label('Add Nav')).tap()
        await expect(element(by.text('Challenge'))).toBeVisible();
        await expect(element(by.text('Friend'))).toBeVisible();
        await expect(element(by.text('League'))).toBeVisible();
    });

    it('Click on Challenge', async () => {
        await element(by.text('Challenge')).tap()
        await expect(element(by.text('Send'))).toBeVisible();
        await expect(element(by.text('Log'))).toBeVisible();
        await expect(element(by.text('Send'))).toHaveId("Invalid Send");
    });

    it('Click on Recommend Challenge', async () => {
        await element(by.text('Recommend Challenge')).tap()
        await expect(element(by.text('Send'))).toHaveId("Valid Send");
    });

    it('Click on Send Challenge', async () => {
        await element(by.text('Send')).tap()
        await expect(element(by.text('Send'))).toHaveId("Invalid Send");
    });
});
