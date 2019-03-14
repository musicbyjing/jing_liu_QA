const assert = require('assert');
const AssertionError = require('assert').AssertionError;
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');



describe('Login error message', function () {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('message should be present: "The user or password is incorrect."', async function () {
        try {
            await driver.get('https://uat.ormuco.com/login');
            await driver.sleep(5000);
            await driver.findElement(By.id('username')).sendKeys('INVALID');
            await driver.findElement(By.id('password')).sendKeys('CREDENTIALS', Key.RETURN);
            let errorElText = await driver.findElement(By.xpath('//*[@id="login_form"]/ng-form/div[3]/div[1]/div/div/span')).getText();
            assert.equal(errorElText, "The user or password is incorrect.");
        } catch (error) {
            if (error instanceof AssertionError) {
                throw new Error(error);
            } else {
                console.log(error);
            }
        }

    });

    after(async () => driver.quit());

});