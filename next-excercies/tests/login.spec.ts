import { test, expect } from '@playwright/test';

test('login process', async ({ page }) => {
  // 1. Otwórz stronę logowania
  await page.goto('http://localhost:3000/user/signin');

  // 2. Poczekaj, aż pojawi się nagłówek "Logowanie"
  await page.getByRole('heading', { name: 'Logowanie' }).waitFor();

  // 3. Wypełnij pola formularza
  await page.getByLabel('Email').fill('klusbartek8@gmail.com');
  await page.getByLabel('Hasło').fill('Bartek99927');

  // 4. Kliknij przycisk "Zaloguj"
  await page.getByRole('button', { name: 'Zaloguj' }).click();

  // 5. Oczekuj przekierowania np. na /user/profile (lub "/", jeśli tak to ustawione)
  await expect(page).toHaveURL('http://localhost:3000/user/profile');
});
