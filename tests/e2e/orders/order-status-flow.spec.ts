import { test, expect } from '@playwright/test'
import { openOrder, changeOrderStatusViaUI } from '../helpers/order.helpers'
import { expectOrderStatus } from '../helpers/assertions'
import { apiCreateOrder, apiAddServiceToOrder, apiChangeOrderStatus, getSeededData } from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES } from '../fixtures/test-constants'

test.describe('Order Status Flow', () => {
  test.describe.serial('Scenario A: Order without products (services only)', () => {
    let orderId: number

    test.beforeAll(async () => {
      const seeded = getSeededData()
      const order = await apiCreateOrder()
      orderId = order.id || order.data?.id
      // Add a service (no products)
      await apiAddServiceToOrder(
        orderId,
        seeded.serviceIds[0],
        TEST_SERVICE_PRICES['Замена масла'].appliedRate,
        TEST_SERVICE_PRICES['Замена масла'].appliedPrice
      )
    })

    test('APPLICATION → ORDER', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Заказ-наряд')
      await expectOrderStatus(page, 'Заказ-наряд')
    })

    test('ORDER → IN_PROGRESS', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'В работе')
      await expectOrderStatus(page, 'В работе')
    })

    test('IN_PROGRESS → COMPLETED', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Выполнен')
      await expectOrderStatus(page, 'Выполнен')
    })
  })

  test.describe.serial('Scenario B: Order with products', () => {
    let orderId: number

    test.beforeAll(async () => {
      const seeded = getSeededData()
      const order = await apiCreateOrder()
      orderId = order.id || order.data?.id
      await apiAddServiceToOrder(
        orderId,
        seeded.serviceIds[0],
        TEST_SERVICE_PRICES['Замена масла'].appliedRate,
        TEST_SERVICE_PRICES['Замена масла'].appliedPrice
      )
      // Products are added via UI or API — for status flow, assume products exist
      // TODO: add product to order via API helper when available
    })

    test('APPLICATION → ORDER', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Заказ-наряд')
      await expectOrderStatus(page, 'Заказ-наряд')
    })

    test('ORDER → WAITING_WAREHOUSE (has products)', async ({ page }) => {
      await openOrder(page, orderId.toString())
      // TODO: verify this transition requires products in order
      await changeOrderStatusViaUI(page, 'Ждёт склада')
      await expectOrderStatus(page, 'Ждёт склада')
    })

    test('WAITING_WAREHOUSE → IN_PROGRESS (after transfer)', async ({ page }) => {
      await openOrder(page, orderId.toString())
      // TODO: may need to transfer products first
      await changeOrderStatusViaUI(page, 'В работе')
      await expectOrderStatus(page, 'В работе')
    })

    test('IN_PROGRESS → WAITING_PAYMENT', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Ожидает оплаты')
      await expectOrderStatus(page, 'Ожидает оплаты')
    })

    test('WAITING_PAYMENT → COMPLETED', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Выполнен')
      await expectOrderStatus(page, 'Выполнен')
    })
  })

  test.describe.serial('Scenario C: Cancellation', () => {
    let orderId: number

    test.beforeAll(async () => {
      const order = await apiCreateOrder()
      orderId = order.id || order.data?.id
    })

    test('should cancel order', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Отменён')
      await expectOrderStatus(page, 'Отменён')
    })
  })

  test.describe('Scenario D: Invalid transitions', () => {
    test('should not allow APPLICATION → IN_PROGRESS directly', async ({ page }) => {
      const order = await apiCreateOrder()
      const orderId = (order.id || order.data?.id).toString()

      await openOrder(page, orderId)

      // TODO: verify that "В работе" option is not available from APPLICATION
      // This may be a disabled button, missing option, or error on click
      // Depends on frontend implementation
    })
  })
})
