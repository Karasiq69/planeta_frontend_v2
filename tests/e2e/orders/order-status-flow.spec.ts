import { test, expect } from '@playwright/test'
import { openOrder, changeOrderStatusViaUI } from '../helpers/order.helpers'
import { expectOrderStatus } from '../helpers/assertions'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-status-flow')

test.describe('Order Status Flow', () => {
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)

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

  test.describe.serial('Scenario A: Order without products (services only)', () => {
    let orderId: number

    test.beforeAll(async () => {
      const order = await apiCreateOrder()
      orderId = order.id || order.data?.id
      await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)
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
      await changeOrderStatusViaUI(page, 'Завершен')
      await expectOrderStatus(page, 'Завершен')
    })
  })

  test.describe.serial('Scenario B: Order with products', () => {
    let orderId: number

    test.beforeAll(async () => {
      const order = await apiCreateOrder()
      orderId = order.id || order.data?.id
      await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)
    })

    test('APPLICATION → ORDER', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Заказ-наряд')
      await expectOrderStatus(page, 'Заказ-наряд')
    })

    test('ORDER → WAITING_WAREHOUSE', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Ждет склад')
      await expectOrderStatus(page, 'Ждет склад')
    })

    test('WAITING_WAREHOUSE → IN_PROGRESS', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'В работе')
      await expectOrderStatus(page, 'В работе')
    })

    test('IN_PROGRESS → WAITING_PAYMENT', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Ждет оплаты')
      await expectOrderStatus(page, 'Ждет оплаты')
    })

    test('WAITING_PAYMENT → COMPLETED', async ({ page }) => {
      await openOrder(page, orderId.toString())
      await changeOrderStatusViaUI(page, 'Завершен')
      await expectOrderStatus(page, 'Завершен')
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
      await changeOrderStatusViaUI(page, 'Отменен')
      await expectOrderStatus(page, 'Отменен')
    })
  })

  test.describe('Scenario D: Invalid transitions', () => {
    test('should not allow APPLICATION → IN_PROGRESS directly', async ({ page }) => {
      const order = await apiCreateOrder()
      const orderId = (order.id || order.data?.id).toString()

      await openOrder(page, orderId)

      // "В работе" button should not be available from APPLICATION status
      // The next status button should only show "Заказ-наряд"
      const inProgressBtn = page.getByRole('button', { name: /В работе/i })
      await expect(inProgressBtn).not.toBeVisible()
    })
  })
})
