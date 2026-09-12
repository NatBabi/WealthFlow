import { test, expect } from '@playwright/test';

test.describe('WealthFlow Application', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test('should navigate to setup wizard from landing page and complete setup', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Verify Landing Page
    await expect(page.locator('text=The System')).toBeVisible();
    await expect(page.locator('text=Start Now')).toBeVisible();

    // Click "Enter App" or "Start Now"
    await page.click('text=Start Now');

    // Verify Setup Wizard Step 1
    await expect(page.locator('text=Welcome to WealthFlow')).toBeVisible();
    
    // Fill Profile
    await page.fill('input[placeholder="Enter your name"]', 'John Doe');
    await page.fill('input[type="number"]', '10000');
    
    // Click Continue
    await page.click('text=Continue →');

    // Verify Setup Wizard Step 2
    await expect(page.locator('text=Your Money Split')).toBeVisible();
    
    // Click Continue again
    await page.click('text=Continue →');

    // Verify Setup Wizard Step 3
    await expect(page.locator('text=You\'re All Set!')).toBeVisible();
    
    // Click Start Building Wealth
    await page.click('button:has-text("Start Building Wealth")');

    // Verify Dashboard
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=$10,000')).toBeVisible();
    await expect(page.locator('text=25 / 15 / 50 / 10 Framework')).toBeVisible();
  });
});
