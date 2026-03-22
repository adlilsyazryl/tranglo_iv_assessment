import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async checker() {
    await expect(this.page.locator('[id="user-name"]')).toBeVisible();
    await expect(this.page.locator('[id="password"]')).toBeVisible();
    await expect(this.page.locator('[id="login-button"]')).toBeVisible();
  }

  async login(userName: string, password: string) {
    await this.page.locator('[id="user-name"]').fill(userName);
    await this.page.locator('[id="password"]').fill(password);
    await this.page.locator('[id="login-button"]').click();
  }
}