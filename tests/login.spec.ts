import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('https://browser.atakama.com/login/');
});

test('Valid Login', async ({ page }) => {
  await page.getByRole('button', { name: 'Login with Azure' }).click();
  await page.getByPlaceholder('Email or phone').fill('OVIDIUDONCIU@InterviewCandidates743.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').fill('456563Yoyu');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page).toHaveURL('https://browser.atakama.com/home/');
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
});

test('Invalid Login - Invalid Email', async ({ page }) => {
  await page.getByRole('button', { name: 'Login with Azure' }).click();
  await page.getByPlaceholder('Email or phone').fill('INVALID@InterviewCandidates743.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('#usernameError')).toContainText('This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.');
});

test('Invalid Login - Invalid Password', async ({ page }) => {
  await page.getByRole('button', { name: 'Login with Azure' }).click();
  await page.getByPlaceholder('Email or phone').fill('OVIDIUDONCIU@InterviewCandidates743.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').fill('invalid-password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#passwordError')).toContainText('Your account or password is incorrect');
});

test('Logout', async ({ page }) => {
  await page.getByRole('button', { name: 'Login with Azure' }).click();
  await page.getByPlaceholder('Email or phone').fill('OVIDIUDONCIU@InterviewCandidates743.onmicrosoft.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').fill('456563Yoyu');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page).toHaveURL('https://browser.atakama.com/home/');
  await expect(page.getByText('O', { exact: true })).toBeVisible();
  await page.getByText('O', { exact: true }).click();
  await page.locator('#kama-logout-button').click();
  await expect(page.getByRole('heading', { name: 'Welcome to Atakama' })).toBeVisible();
});
