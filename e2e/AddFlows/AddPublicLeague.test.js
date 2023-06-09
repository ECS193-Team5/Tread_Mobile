describe('Add League Public Test', () => {
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

    it('Enter League Info', async () => {
        await element(by.id('input')).atIndex(0).typeText("testing")
        await element(by.id('input')).atIndex(1).typeText("testing description")
        await expect(element(by.text('Submit'))).toHaveId("valid submit");
    });

    it('Submit league', async () => {
        await element(by.text("Public")).tap()
        await element(by.text('Submit')).tap()
    });
});
