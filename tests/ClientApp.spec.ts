import {expect, test} from '@playwright/test'

test('Browser Context First Playwright Test', async ({page})=>{
    
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#login");
    const cardTitles = page.locator("//div[@class='card-body']/h5");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await userName.fill("sbhatt@gmail.com");
    await password.fill("Test@123");
    await signIn.click();

    // await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    const titles = await cardTitles.allTextContents();

    console.log(titles);


});