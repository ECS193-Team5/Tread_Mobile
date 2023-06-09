describe('Medal Scroll Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Switch to Profile Tab', async () => {
        await element(by.label('Profile Nav')).tap()
        await expect(element(by.text('In progress'))).toBeVisible();
        await expect(element(by.text('Completed'))).toBeVisible();
    });

    it('Scroll Down In progress', async () => {
        await expect(element(by.text('HIIT 1 hr'))).toBeVisible();
        await element(by.id('Profile Scroll')).scrollTo('bottom')
        await expect(element(by.text('Weightlifting 10 hr'))).toBeVisible();
    });

    it('Scroll Up In progress', async () => {
        await element(by.id('Profile Scroll')).scrollTo('top')
        await expect(element(by.text('HIIT 1 hr')).atIndex(0)).toBeVisible();
    });

    it('Scroll Down Completed', async () => {
        await element(by.text('Completed')).tap();
        await expect(element(by.text('Swim 1 hr')).atIndex(0)).toBeVisible();
        await element(by.id('Profile Scroll')).scrollTo('bottom')
        await expect(element(by.text('Walk 10 hr')).atIndex(0)).toBeVisible();
    });

    it('Scroll Up Completed', async () => {
        await element(by.id('Profile Scroll')).scrollTo('top')
        await expect(element(by.text('Swim 1 hr')).atIndex(0)).toBeVisible();
    });
});