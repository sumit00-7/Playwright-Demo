import {expect, test} from '@playwright/test'

test('Browser Context-Validate Error login', async ({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('UI controls', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const documentLink = page.locator("[href*='documents-request']");
    const dropDown = page.locator("select.form-control");

    await dropDown.selectOption('consult');
    await page.locator(".radiotextsty").last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');

    // await page.pause();

});

test.only('Child windows handel', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');

    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'),
    documentLink.click() 
    ]);
    
    const text:any = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split('.')[0];
    console.log(domain);
    
    await userName.fill(domain);
    await page.pause();
    console.log(await userName.textContent());
});