import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import {
  apiCreateOrder,
  apiAddServiceToOrder,
  apiChangeOrderStatus,
  getSeededData,
  setActiveMocker,
} from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-payment')

// TODO: Payment tests require a cash register to exist in the DB.
// Currently no cash registers are seeded. Once a cash register is created
// (via seed or API), these tests should work with the dialog:
//   - "Принять оплату" dialog with: Сумма (spinbutton), Касса (select),
//     Способ оплаты (select: Наличные/Карта/Перевод/Онлайн), Комментарий
//   - Submit button: "Принять оплату"
test.describe.serial('Order Payment Flow', () => {
  let orderId: number
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)

  test.beforeAll(async () => {
    setActiveMocker(mocker)
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id
    await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)
    await apiChangeOrderStatus(orderId, 'ORDER')
    await apiChangeOrderStatus(orderId, 'IN_PROGRESS')
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test.fixme('should accept partial payment', async ({ page }) => {
    // FIXME: No cash registers in test DB — dialog requires selecting a cash register
  })

  test.fixme('should accept full remaining payment', async ({ page }) => {
    // FIXME: Depends on partial payment test
  })

  test.fixme('should show all payment methods', async ({ page }) => {
    // FIXME: No cash registers in test DB
  })

  test.fixme('should reject overpayment', async ({ page }) => {
    // FIXME: No cash registers in test DB
  })
})
