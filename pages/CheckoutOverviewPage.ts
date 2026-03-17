import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async checker() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(this.page.locator('[id="checkout_summary_container"]')).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item"]')).toBeVisible();
  }

  async verifyInfo(
    selectedItemName: string,
    selectedItemPriceText: string,
    selectedItemPrice: number,
    taxAmount: number,
    totalPrice: number
  ) {
    await expect(this.page.locator('[data-test="item-quantity"]')).toHaveText('1');
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(selectedItemName);
    await expect(this.page.locator('[data-test="inventory-item-price"]')).toHaveText(selectedItemPriceText);

    await expect(this.page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(this.page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');
    await expect(this.page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await expect(this.page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');

    await expect(this.page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');
    await expect(this.page.locator('[data-test="subtotal-label"]')).toHaveText(`Item total: $${selectedItemPrice.toFixed(2)}`);
    await expect(this.page.locator('[data-test="tax-label"]')).toHaveText(`Tax: $${taxAmount.toFixed(2)}`);
    await expect(this.page.locator('[data-test="total-label"]')).toHaveText(`Total: $${totalPrice.toFixed(2)}`);
  }

  async finish() {
    await this.page.locator('[id="finish"]').click();
  }
}