import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { expectMechanicEarning } from '../helpers/assertions'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData } from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES } from '../fixtures/test-constants'

test.describe.serial('Order Mechanics Flow', () => {
  let orderId: number

  test.beforeAll(async () => {
    const seeded = getSeededData()
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add a service via API
    await apiAddServiceToOrder(
      orderId,
      seeded.serviceIds[0],
      TEST_SERVICE_PRICES['Замена масла'].appliedRate,
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice
    )
  })

  test('should assign mechanic to service', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить механика|назначить/i }).click()
    await page.getByText('Иван Механиков').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Механиков')).toBeVisible()
  })

  test('should show mechanic earning calculation', async ({ page }) => {
    await openOrder(page, orderId.toString())
    // Verify mechanic earning is displayed
    await expectMechanicEarning(page, 'Механиков', TEST_SERVICE_PRICES['Замена масла'].appliedPrice)
  })

  test('should assign second mechanic and split participation', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить механика|назначить/i }).click()
    await page.getByText('Пётр Слесарев').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Механиков')).toBeVisible()
    await expect(page.getByText('Слесарев')).toBeVisible()
  })

  test('should remove mechanic', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    const row = page.getByRole('row', { name: /Слесарев/i })
    await row.getByRole('button', { name: /удалить/i }).click()

    const confirmBtn = page.getByRole('button', { name: /подтвердить|да|удалить/i })
    if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmBtn.click()
    }
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Слесарев')).not.toBeVisible()
  })
})
