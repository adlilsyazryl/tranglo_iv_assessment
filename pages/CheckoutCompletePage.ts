import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  async checker() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(this.page.locator('[data-test="complete-text"]')).toBeVisible();
  }
}