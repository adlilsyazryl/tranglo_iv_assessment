import { Page, expect } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private page: Page) {}

  async checker() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    await expect(this.page.locator('[id="checkout_info_container"]')).toBeVisible();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[id="first-name"]').fill(firstName);
    await this.page.locator('[id="last-name"]').fill(lastName);
    await this.page.locator('[id="postal-code"]').fill(postalCode);
    await expect(this.page.locator('[id="continue"]')).toBeVisible();
    await this.page.locator('[id="continue"]').click();
  }
}