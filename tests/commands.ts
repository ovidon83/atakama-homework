
import { test, expect, Page } from '@playwright/test';

// various test scenarios for adding items to the cart
// comment out the line before the `addAndViewCart` function in one of the tests 
// Then run the test to see how box steps hide the implementation details of the step

// reusable function to add an item to the cart and view the cart
// we wrap our actions in a test step and set box to true
async function Login(page: Page){
    await page.goto('https://browser.atakama.com/login/');
    await page.getByRole('button', { name: 'Login with Azure' }).click();
    await page.getByPlaceholder('Email or phone').fill('OVIDIUDONCIU@InterviewCandidates743.onmicrosoft.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill('456563Yoyu');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page).toHaveURL('https://browser.atakama.com/home/');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
}