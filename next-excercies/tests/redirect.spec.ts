import { test, expect } from '@playwright/test';

test('redirect unauthenticated user', async ({ page }) => {
  // 1. Wejdź na stronę profilu bez logowania
  await page.goto('http://localhost:3000/user/profile');

  // 2. Oczekuj, że wylądujesz na /user/signin (ew. z query param)
  await expect(page).toHaveURL(/\/user\/signin/);
});
