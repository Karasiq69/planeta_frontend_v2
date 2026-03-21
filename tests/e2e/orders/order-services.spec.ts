import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, getSeededData } from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES } from '../fixtures/test-constants'

test.describe.serial('Order Services Flow', () => {
  let orderId: number

  test.beforeAll(async () => {
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id
  })

  test('should add a service to order', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить услугу/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Замена масла')
    await page.getByText('Замена масла').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Замена масла')).toBeVisible()
    await expectOrderTotal(page, { services: TEST_SERVICE_PRICES['Замена масла'].appliedPrice })
  })

  test('should add multiple services and verify total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить услугу/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Диагностика')
    await page.getByText('Диагностика').click()
    await page.waitForLoadState('networkidle')

    const expectedTotal =
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice + TEST_SERVICE_PRICES['Диагностика'].appliedPrice

    await expectOrderTotal(page, { services: expectedTotal })
  })

  test('should remove a service and recalculate total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    const row = page.getByRole('row', { name: /Диагностика/i })
    await row.getByRole('button', { name: /удалить/i }).click()

    // Confirm deletion if dialog appears
    const confirmBtn = page.getByRole('button', { name: /подтвердить|да|удалить/i })
    if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmBtn.click()
    }
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Диагностика')).not.toBeVisible()
    await expectOrderTotal(page, { services: TEST_SERVICE_PRICES['Замена масла'].appliedPrice })
  })
})
