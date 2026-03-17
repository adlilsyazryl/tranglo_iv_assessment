import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async checker() {
    await expect(this.page.locator('[data-test="username"]')).toBeVisible();
    await expect(this.page.locator('[data-test="password"]')).toBeVisible();
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }

  async login(userName: string, password: string) {
    await this.page.locator('[placeholder="Username"]').fill(userName);
    await this.page.locator('[placeholder="Password"]').fill(password);
    await this.page.locator('[id="login-button"]').click();
  }
}