import { test, expect } from '@playwright/test';

test('has link to Sign In page', async ({ page }) => {
  // 1. Otwórz stronę główną
  await page.goto('http://localhost:3000/');

  // 2. Kliknij przycisk/link z tekstem "Logowanie" (albo "Sign In" z sidebara)
  await page.click('text=Logowanie');

  // 3. Sprawdź, czy trafiliśmy na /user/signin
  await expect(page).toHaveURL('http://localhost:3000/user/signin');

  // 4. Sprawdź, czy jest nagłówek "Logowanie"
  await expect(
    page.getByRole('heading', { name: 'Logowanie' })
  ).toBeVisible();
});
