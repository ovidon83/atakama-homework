import { test, expect, Page } from '@playwright/test';

let page: Page;

test.describe('Dashboard', () => {
  test.beforeAll(async ({ browser }) => {
    // Runs before each test and signs in each page.
    page = await browser.newPage();
    await page.goto('https://browser.atakama.com/login/');
    await page.getByRole('button', { name: 'Login with Azure' }).click();
    await page.getByPlaceholder('Email or phone').fill('OVIDIUDONCIU@InterviewCandidates743.onmicrosoft.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill('456563Yoyu');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page).toHaveURL('https://browser.atakama.com/home/');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('Global view - Selector', async () => {
    await expect(page.getByTestId('selected-tenant')).toBeVisible();
    await page.getByTestId('selected-tenant').click();
    await page.getByRole('button', { name: 'InterviewCandidates743' }).click();
    await expect(page.getByTestId('selected-tenant')).toBeVisible();
  });

  test('Global view - Widgets', async () => {
    await expect(page.getByTestId('selected-tenant')).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByRole('heading', { name: '⏳️ User activity' })).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Daily active users')).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Active users', { exact: true })).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Top domains')).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter')).toBeVisible();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByTestId('fixed-width-filters').getByRole('listitem').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByTestId('fixed-width-filters').click();
  });

  test('Tenants view - Widgets', async () => {
    await expect(page.getByTestId('selected-tenant')).toBeVisible();
    await page.getByTestId('selected-tenant').click();
    await page.getByRole('button', { name: 'InterviewCandidates743' }).nth(1).click();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByRole('heading', { name: '⏳️ User activity' })).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Daily active users')).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Active users', { exact: true })).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByText('Top domains')).toBeVisible();
    await expect(page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter')).toBeVisible();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByLabel('Date Filter').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByTestId('fixed-width-filters').getByRole('listitem').click();
    await page.frameLocator('[data-testid="dash-embed-iframe"]').getByTestId('fixed-width-filters').click();
  });

  test('Tenants view - Search', async () => {
    await page.getByTestId('selected-tenant').click();
    await page.getByPlaceholder('Search tenant').click();
    await page.getByPlaceholder('Search tenant').fill('interview');
    await page.getByPlaceholder('Search tenant').press('Enter');
    await page.getByPlaceholder('Search tenant').fill('no result');
    await page.getByTestId('tenant-list').click();
    await page.getByRole('main').click();
  });

  test('Date filter - Default filter', async () => {
    //tbd
  });

  test('Date filter - Today', async () => {
    //tbd
  });
});