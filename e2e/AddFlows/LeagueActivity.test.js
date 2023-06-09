describe('League Activity Test', () => {
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

    it('Choose Unit Amount', async () => {
        await element(by.id('numeric input')).typeText("5")
        await element(by.id('plus')).tap()
        await element(by.id('minus')).tap()
        await expect(element(by.id('numeric input'))).toHaveText("5");
    });

    it('Choose Unit', async () => {
        await element(by.text('Units')).tap()
        await element(by.text('hour (hr)')).tap()
        await expect(element(by.text('hour (hr)'))).toBeVisible();
    });

    it('Choose League', async () => {
        await element(by.text('League')).tap()
        await expect(element(by.text('Choose a league'))).toBeVisible();
        await element(by.text('E2e')).tap()
        await expect(element(by.text('E2e'))).toBeVisible();
    });

    it('Click on Send Challenge', async () => {
        await expect(element(by.text('Send'))).toHaveId("Valid Send");
        await element(by.text('Send')).tap()
        await expect(element(by.text('Send'))).toHaveId("Invalid Send");
    });
});
