describe('Add Friend Test', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Add Tab', async () => {
        await element(by.label('Add Nav')).tap()
        await expect(element(by.text('Challenge'))).toBeVisible();
        await expect(element(by.text('Friend'))).toBeVisible();
        await expect(element(by.text('League'))).toBeVisible();
    });

    it('Click on Friend', async () => {
        await element(by.text('Friend')).tap()
        await expect(element(by.text('Add Friend'))).toBeVisible();
        await expect(element(by.text('Suggested Friends'))).toBeVisible();
    });

    it('Enter Friend id', async () => {
        await expect(element(by.text('Send Request'))).toHaveId("invalid send");
        await element(by.id('enter id')).typeText("testing#0000")
        await expect(element(by.text('Send Request'))).toHaveId("valid send");
    });

    it('Send Friend request', async () => {
        await element(by.text('Send Request')).tap()
        await expect(element(by.text('Send Request'))).toHaveId("invalid send");
    });

    it('Check suggested', async () => {
      await element(by.text('Bhhh#5877')).atIndex(0).swipe('left');
      await expect(element(by.id('add friend')).atIndex(0)).toBeVisible();
    });
});
