import { test, expect } from '@playwright/test';

test('La aplicación debe cargar correctamente', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('ion-app')).toBeVisible();
  await expect(page.locator('ion-content')).toBeVisible();
});