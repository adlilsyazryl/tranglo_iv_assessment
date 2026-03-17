import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.use({ baseURL: 'https://www.saucedemo.com' });

test('1. Web UI Automation', async ({ page }) => {
  const userName = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'Adlil';
  const secondName = 'Syazryl';
  const postalcode = '53300';

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.checker();
  await loginPage.login(userName, password);

  await inventoryPage.checker();
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.checker();

  const {
    selectedItemName,
    selectedItemPriceText,
    selectedItemPrice,
    taxAmount,
    totalPrice,
  } = await cartPage.getSelectedItemDetails();

  await cartPage.checkItemDetails(selectedItemName, selectedItemPriceText);
  await cartPage.clickCheckout();

  await checkoutInfoPage.checker();
  await checkoutInfoPage.fillInformation(firstName, secondName, postalcode);

  await checkoutOverviewPage.checker();
  await checkoutOverviewPage.verifyInfo(
    selectedItemName,
    selectedItemPriceText,
    selectedItemPrice,
    taxAmount,
    totalPrice
  );
  await checkoutOverviewPage.finish();

  await checkoutCompletePage.checker();
});