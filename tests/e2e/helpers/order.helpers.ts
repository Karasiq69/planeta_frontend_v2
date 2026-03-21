import { type Page, expect } from '@playwright/test'

export async function navigateToOrders(page: Page) {
  await page.goto('/orders')
  await page.waitForLoadState('networkidle')
}

export async function createOrderViaUI(page: Page): Promise<string> {
  await navigateToOrders(page)
  // TODO: fill actual selector after codegen (Task 9)
  await page.getByRole('button', { name: /создать/i }).click()
  await page.waitForURL(/\/orders\/\d+/)
  const url = page.url()
  const orderId = url.split('/orders/')[1]
  return orderId
}

export async function openOrder(page: Page, orderId: string) {
  await page.goto(`/orders/${orderId}`)
  await page.waitForLoadState('networkidle')
}

export async function changeOrderStatusViaUI(page: Page, statusLabel: string) {
  // TODO: fill actual selector after codegen (Task 9)
  await page.getByRole('combobox', { name: /статус/i }).click()
  await page.getByRole('option', { name: statusLabel }).click()
  await page.waitForLoadState('networkidle')
}
