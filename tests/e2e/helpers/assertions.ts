import { type Page, expect, type Locator } from '@playwright/test'

export async function expectOrderStatus(page: Page, expectedStatus: string) {
  // Status is shown in the page heading: "Заявка №19599"
  // or as a status badge near the heading
  const heading = page.getByRole('heading').filter({ hasText: /№\d+/ })
  await expect(heading).toBeVisible({ timeout: 10_000 })
  // Status may also be in a badge near the heading
  // Try heading first, fall back to page-level check
  try {
    await expect(heading).toContainText(expectedStatus, { timeout: 3_000 })
  } catch {
    // Status might be displayed elsewhere on page
    await expect(page.getByText(expectedStatus).first()).toBeVisible({ timeout: 5_000 })
  }
}

/**
 * Find sidebar section by its title text (e.g. "Работы", "Товары")
 * The sections are in the order summary sidebar, not the tab area
 */
function getSidebarSection(page: Page, sectionTitle: string): Locator {
  // Match the section title that is NOT inside a tab - look for the sidebar area
  // Structure: generic > generic:sectionTitle + list:items
  // Use nth(1) to skip the tab "Работы" and get the sidebar section
  if (sectionTitle === 'Работы') {
    // "Работы" appears both as tab and sidebar title - get the last one (sidebar)
    return page.getByText(sectionTitle, { exact: true }).last().locator('..')
  }
  return page.getByText(sectionTitle, { exact: true }).locator('..')
}

export async function expectOrderTotal(
  page: Page,
  expected: { services?: number; parts?: number; vat?: number; total?: number }
) {
  if (expected.services !== undefined) {
    const section = getSidebarSection(page, 'Работы')
    const sumItem = section.locator('li').filter({ hasText: 'Сумма' })
    await expect(sumItem).toContainText(formatPrice(expected.services), { timeout: 5_000 })
  }

  if (expected.parts !== undefined) {
    const section = getSidebarSection(page, 'Товары')
    const totalItem = section.locator('li').filter({ hasText: 'Итого' })
    await expect(totalItem).toContainText(formatPrice(expected.parts), { timeout: 5_000 })
  }

  if (expected.total !== undefined) {
    const section = getSidebarSection(page, 'Информация о заказе')
    const totalItem = section.locator('li').filter({ hasText: 'Итого' })
    await expect(totalItem).toContainText(formatPrice(expected.total), { timeout: 5_000 })
  }
}

export async function expectMechanicEarning(page: Page, mechanicName: string, expected: number) {
  const row = page.getByRole('row', { name: new RegExp(mechanicName) })
  await expect(row).toContainText(formatPrice(expected))
}

export async function expectPaymentInfo(
  page: Page,
  expected: { toPay?: number; paid?: number; remaining?: number }
) {
  // Payment section structure:
  // generic > generic:"К оплате" + generic:"0,00 руб."
  // generic > generic:"Оплачено" + generic:"0,00 руб."
  // generic > generic:"Остаток"  + generic:"0,00 руб."

  if (expected.toPay !== undefined) {
    const item = page.getByText('К оплате').locator('..')
    await expect(item).toContainText(formatPrice(expected.toPay), { timeout: 5_000 })
  }

  if (expected.paid !== undefined) {
    const item = page.getByText('Оплачено').locator('..')
    await expect(item).toContainText(formatPrice(expected.paid), { timeout: 5_000 })
  }

  if (expected.remaining !== undefined) {
    const item = page.getByText('Остаток').locator('..')
    await expect(item).toContainText(formatPrice(expected.remaining), { timeout: 5_000 })
  }
}

/** Formats number as price (e.g. 1500 -> "1 500,00") */
function formatPrice(amount: number): string {
  return amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

