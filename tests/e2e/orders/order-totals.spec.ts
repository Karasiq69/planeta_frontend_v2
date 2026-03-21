import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData } from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES, TEST_PRODUCTS } from '../fixtures/test-constants'

test.describe.serial('Order Totals & VAT', () => {
  let orderId: number

  test.beforeAll(async () => {
    const seeded = getSeededData()
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add two services via API
    await apiAddServiceToOrder(
      orderId,
      seeded.serviceIds[0],
      TEST_SERVICE_PRICES['Замена масла'].appliedRate,
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice
    )
    await apiAddServiceToOrder(
      orderId,
      seeded.serviceIds[1],
      TEST_SERVICE_PRICES['Диагностика'].appliedRate,
      TEST_SERVICE_PRICES['Диагностика'].appliedPrice
    )

    // TODO: add products via API when helper available
  })

  test('should display correct services total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    const expectedServices =
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice + TEST_SERVICE_PRICES['Диагностика'].appliedPrice

    await expectOrderTotal(page, { services: expectedServices })
  })

  test('should display correct parts total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify parts total after adding products
    // For now, parts should be 0 (no products added via API yet)
    await expectOrderTotal(page, { parts: 0 })
  })

  test('should display correct overall total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    const expectedTotal =
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice + TEST_SERVICE_PRICES['Диагностика'].appliedPrice

    await expectOrderTotal(page, { total: expectedTotal })
  })

  test('should recalculate after adding service via UI', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить услугу/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('ТО плановое')
    await page.getByText('ТО плановое').click()
    await page.waitForLoadState('networkidle')

    const expectedTotal =
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice +
      TEST_SERVICE_PRICES['Диагностика'].appliedPrice +
      TEST_SERVICE_PRICES['ТО плановое'].appliedPrice

    await expectOrderTotal(page, { services: expectedTotal, total: expectedTotal })
  })

  test('should recalculate after removing service via UI', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // Remove "ТО плановое"
    const row = page.getByRole('row', { name: /ТО плановое/i })
    await row.getByRole('button', { name: /удалить/i }).click()

    const confirmBtn = page.getByRole('button', { name: /подтвердить|да|удалить/i })
    if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmBtn.click()
    }
    await page.waitForLoadState('networkidle')

    const expectedTotal =
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice + TEST_SERVICE_PRICES['Диагностика'].appliedPrice

    await expectOrderTotal(page, { services: expectedTotal, total: expectedTotal })
  })
})
