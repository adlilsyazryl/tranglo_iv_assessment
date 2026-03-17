import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async checker() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(this.page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-list"]')).toBeVisible();
  }

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}