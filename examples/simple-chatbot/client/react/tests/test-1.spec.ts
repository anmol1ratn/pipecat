import { test, expect } from '@playwright/test';

test('test', async ({ browser }) => {
  const context = await browser.newContext({
    permissions: ['microphone']
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/');
  const statusElement = page.locator('#current-status');
  const connectButton = page.getByRole('button', { name: 'Connect' });
  await connectButton.click();
  await expect(statusElement).toHaveText("ready");
  await expect(connectButton).toHaveText("Disconnect");
  await context.close();
});