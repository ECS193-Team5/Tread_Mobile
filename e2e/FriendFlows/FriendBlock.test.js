describe('Friend Block Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Friends Tab', async () => {
        await element(by.label('Friends Nav')).tap()
        await expect(element(by.text('All Friends'))).toBeVisible();
    });

    it('Check Block Friend', async () => {
        //await element(by.text('From : ')).atIndex(0).swipe('left');
        await expect(element(by.id('block')).atIndex(0)).toBeVisible();
    });

    it('Block Friend', async () => {
        await element(by.id('block')).atIndex(0).tap();
        // click on confirm
    });

});