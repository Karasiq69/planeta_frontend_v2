import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { apiCreateOrder, apiAddServiceToOrder, apiChangeOrderStatus, getSeededData } from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES } from '../fixtures/test-constants'

test.describe.serial('Order Warehouse Flow', () => {
  let orderId: number

  test.beforeAll(async () => {
    const seeded = getSeededData()
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add service
    await apiAddServiceToOrder(
      orderId,
      seeded.serviceIds[0],
      TEST_SERVICE_PRICES['Замена масла'].appliedRate,
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice
    )

    // TODO: add products to order via API
    // TODO: transition to WAITING_WAREHOUSE status via API
    // apiChangeOrderStatus(orderId, 'ORDER')
    // apiChangeOrderStatus(orderId, 'WAITING_WAREHOUSE')
  })

  test('should show products pending warehouse transfer', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    // Check that products section shows items pending transfer
    // await expect(page.getByText('Ожидает перемещения')).toBeVisible()
  })

  test('should transfer products from warehouse to workshop', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    // Click transfer button, confirm action
    // await page.getByRole('button', { name: /переместить|передать в цех/i }).click()
    // await page.getByRole('button', { name: /подтвердить/i }).click()
    // await page.waitForLoadState('networkidle')

    // Verify products status changed
    // await expect(page.getByText('Перемещено')).toBeVisible()
  })

  test('should show error when insufficient stock', async ({ page }) => {
    // TODO: create order with product quantity exceeding stock
    // Try to transfer — should show error
    await openOrder(page, orderId.toString())

    // TODO: verify error message appears
  })
})
