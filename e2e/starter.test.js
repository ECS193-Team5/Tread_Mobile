describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should tap on a button', async () => {
    await element(by.id('ButtonID')).tap();
  });
});
