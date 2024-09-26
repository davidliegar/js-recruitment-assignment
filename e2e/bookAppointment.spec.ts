import { expect, test } from '@playwright/test';

test('load the page and Reschedule an appointment', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Reschedule an appointment/)
   
  await page.getByText('08:00').waitFor()

  await page.getByText('08:00').click()

  await expect(page.getByRole('dialog')).toBeVisible()

  await page.getByLabel('First name').fill('foo');
  await page.getByLabel('Last name').fill('bar');
  await page.getByLabel('Email').fill('foo@bar.com');
  await page.getByLabel('Phone').fill('+611111111');
  await page.getByLabel('Comments').fill('just a comment');

  await page.getByTestId('cta').click()
  
  await expect(page.getByRole('dialog')).toBeHidden()
});