import { test, expect } from '@playwright/test'
import { openOrder, changeOrderStatusViaUI } from '../helpers/order.helpers'
import { expectOrderStatus } from '../helpers/assertions'
import { apiCreateOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-status-flow')

test.describe('Order Status Flow', () => {
  test.beforeAll(async () => {
    setActiveMocker(mocker)
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test('should change order status', async ({ page }) => {
    const order = await apiCreateOrder()
    const orderId = (order.id || order.data?.id).toString()

    await openOrder(page, orderId)
    await changeOrderStatusViaUI(page, 'Заказ-наряд')
    await expectOrderStatus(page, 'Заказ-наряд')
  })

  test('should cancel order', async ({ page }) => {
    const order = await apiCreateOrder()
    const orderId = (order.id || order.data?.id).toString()

    await openOrder(page, orderId)
    await changeOrderStatusViaUI(page, 'Отменен')
    await expectOrderStatus(page, 'Отменен')
  })

  test('should not allow APPLICATION → IN_PROGRESS directly', async ({ page }) => {
    const order = await apiCreateOrder()
    const orderId = (order.id || order.data?.id).toString()

    await openOrder(page, orderId)

    const inProgressBtn = page.getByRole('button', { name: /В работе/i })
    await expect(inProgressBtn).not.toBeVisible()
  })
})
