const {Given, Then, When} = require('cucumber');
const detox = require('detox');

When('I reload the app', async() => {
	await detox.device.reloadReactNative();
});

Then('I should have login page loaded', async () => {
    await expect(element(by.text('CoPics'))).toBeVisible();
    await expect(element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Phone')))).toBeVisible();
    await expect(element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Password')))).toBeVisible();
  });

When('I click the signup button in login page', async () => {
    await element(by.text('Sign up')).tap()
    // await element(by.type('TouchableOpacity').withDescendant(by.text('Sign up'))).tap()
  });

When('I click the signup button in signup page', async () => {
    await element(by.text('Sign up')).tap()
    // await element(by.type('RCTView').withDescendant(by.text('Sign up'))).tap()
  });

Then('I should have signup page loaded', async () => {
	await expect(element(by.text('Name'))).toBeVisible();
	await expect(element(by.text('Sign up'))).toBeVisible();
  });

Given('I input phone number {string}', async(arg) => {
	await element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Phone'))).typeText(arg)
});

Given('I input name {string}', async(arg) => {
	await element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Name'))).typeText(arg)
});

Given('I input password1 {string}', async(arg) => {
	await element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Password'))).typeText(arg)
});

Given('I input password2 {string}', async(arg) => {
	await element(by.type('RCTSinglelineTextInputView').withDescendant(by.text('Confirm password'))).typeText(arg)
});

Then('I should be in the main page', async() => {
	await expect(element(by.text('Edit'))).toBeVisible();
	await expect(element(by.text('To Be Continued...'))).toBeVisible();
	await expect(element(by.text('Profile'))).toBeVisible();
	//dismiss warnings
	await element(by.text('Dismiss All')).tap()
});

Given('I click the signin button', async () => {
    // await element(by.type('RCTView').withDescendant(by.text('Sign in'))).tap()
    await element(by.text('Sign in')).tap()
  });

Then('I should have err {string}', async(arg) => {
	await expect(element(by.text(arg))).toBeVisible();
});

Given('I finished input', async () => {
    // await element(by.type('RCTView').withDescendant(by.text('Sign in'))).tap()
    await element(by.text('CoPics')).tap()
  });