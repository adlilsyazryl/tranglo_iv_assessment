import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async checker() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(this.page.locator('[data-test="cart-contents-container"]')).toBeVisible();
    await expect(this.page.locator('[data-test="cart-list"]')).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item"]')).toBeVisible();
  }

  async getSelectedItemDetails() {
    const selectedItemName = (await this.page.locator('[data-test="inventory-item-name"]').first().innerText()).trim();
    const selectedItemPriceText = (await this.page.locator('[data-test="inventory-item-price"]').first().innerText()).trim();
    const selectedItemPrice = Number(selectedItemPriceText.replace('$', ''));
    const selectedItemTaxRate = 8 / 100;
    const taxAmount = Number((selectedItemPrice * selectedItemTaxRate).toFixed(2));
    const totalPrice = Number((selectedItemPrice + taxAmount).toFixed(2));

    return {
      selectedItemName,
      selectedItemPriceText,
      selectedItemPrice,
      taxAmount,
      totalPrice,
    };
  }

  async checkItemDetails(selectedItemName: string, selectedItemPriceText: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]').first()).toHaveText(selectedItemName);
    await expect(this.page.locator('[data-test="inventory-item-price"]').first()).toHaveText(selectedItemPriceText);
    await expect(this.page.locator('[data-test="item-quantity"]')).toHaveText('1');
  }

  async clickCheckout() {
    await this.page.locator('[id="checkout"]').click();
  }
}