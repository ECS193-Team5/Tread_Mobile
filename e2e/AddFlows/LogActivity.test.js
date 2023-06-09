describe('Log Activity Test', () => {
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

    it('Click on Log', async () => {
        await element(by.text('Log')).tap()
        await expect(element(by.text('Send')).atIndex(0)).toBeVisible();
        await expect(element(by.text('Log')).atIndex(1)).toHaveId("Invalid Log");
    });

    it('Click on Choose Activity', async () => {
        await element(by.text('Choose an activity')).tap()
        await expect(element(by.text('Enter your own'))).toBeVisible();
    });

    it('Choose Activity', async () => {
        await element(by.text('Enter your own')).tap()
        await expect(element(by.text('Enter your own'))).toBeVisible();
    });

    it('Enter Activity', async () => {
        await element(by.id('enter own')).typeText("testing")
        await expect(element(by.text('testing'))).toBeVisible();
    });

    it('Choose Unit Amount', async () => {
        await element(by.id('numeric input')).typeText("5")
        await expect(element(by.id('numeric input'))).toHaveText("5");
    });

    it('Choose Unit', async () => {
        await element(by.text('Units')).tap()
        await element(by.text('hour (hr)')).tap()
        await expect(element(by.text('hour (hr)'))).toBeVisible();
    });

    it('Click on Send Challenge', async () => {
        await expect(element(by.text('Log')).atIndex(1)).toHaveId("Valid Log");
        await element(by.text('Log')).atIndex(1).tap()
        await expect(element(by.text('Log')).atIndex(1)).toHaveId("Invalid Log");
    });
});
