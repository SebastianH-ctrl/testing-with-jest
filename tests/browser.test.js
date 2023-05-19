const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;

// Bytte ut mot jest egna timeout
jest.setTimeout(1000 * 60 * 5); // 5 minutes


// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

/* NYTT TEST*/
test('Clicking "Poppa från stacken" should open a prompt box', async () => {
	let pop = await driver.findElement(By.id('pop'));
	await pop.click();
	let alert = await driver.switchTo().alert();
	await alert.accept();
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});

    /* NYTT TEST */
    it('should add element to stack and update it', async () => {
        let stack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack).toEqual("Bananer");
    });
});

/*NYTT TEST*/
test('Clicking "Peek" should display the top of the stack', async () => {

	let push = await driver.findElement(By.id('push'));
    await push.click();
    let pushAlert = await driver.switchTo().alert();
    await pushAlert.sendKeys("Oranges");
    await pushAlert.accept();
  
    let peek = await driver.findElement(By.id('peek'));
    await peek.click();
    
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("Oranges");
    
    let pop = await driver.findElement(By.id('pop'));
    await pop.click();
    let popAlert = await driver.switchTo().alert();
    await popAlert.accept();
});

// NYTT TEST
test('Make sure all buttons are active', async () => {
    let pop = await driver.findElement(By.id('pop'));
    let push = await driver.findElement(By.id('push'));
    let peek = await driver.findElement(By.id('peek'));
    
    expect(await pop.isDisplayed()).toBe(true);
    expect(await push.isDisplayed()).toBe(true);
    expect(await peek.isDisplayed()).toBe(true);
});





