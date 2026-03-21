import { type Page, expect } from '@playwright/test'

export async function expectOrderStatus(page: Page, expectedStatus: string) {
  // TODO: fill actual selector after codegen (Task 9)
  const statusElement = page.getByTestId('order-status')
  await expect(statusElement).toContainText(expectedStatus)
}

export async function expectOrderTotal(
  page: Page,
  expected: { services?: number; parts?: number; vat?: number; total?: number }
) {
  // TODO: fill actual selectors after codegen (Task 9)
  if (expected.services !== undefined) {
    const servicesTotal = page.getByTestId('services-total')
    await expect(servicesTotal).toContainText(expected.services.toString())
  }
  if (expected.parts !== undefined) {
    const partsTotal = page.getByTestId('parts-total')
    await expect(partsTotal).toContainText(expected.parts.toString())
  }
  if (expected.total !== undefined) {
    const total = page.getByTestId('order-total')
    await expect(total).toContainText(expected.total.toString())
  }
}

export async function expectMechanicEarning(page: Page, mechanicName: string, expected: number) {
  // TODO: fill actual selector after codegen (Task 9)
  const row = page.getByRole('row', { name: new RegExp(mechanicName) })
  await expect(row).toContainText(expected.toString())
}
