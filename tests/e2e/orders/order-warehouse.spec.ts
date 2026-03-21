import { test } from '@playwright/test'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-warehouse')

test.describe.serial('Order Warehouse Flow', () => {
  let orderId: number
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)

  test.beforeAll(async () => {
    setActiveMocker(mocker)
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add service
    await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)

    // TODO: add products to order via API
    // TODO: transition to WAITING_WAREHOUSE status via API
    // apiChangeOrderStatus(orderId, 'ORDER')
    // apiChangeOrderStatus(orderId, 'WAITING_WAREHOUSE')
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test.fixme('should show products pending warehouse transfer', async ({ page }) => {
    // FIXME: Need to add products to order via API and verify warehouse transfer UI selectors
  })

  test.fixme('should transfer products from warehouse to workshop', async ({ page }) => {
    // FIXME: Need to verify transfer button selectors and confirmation flow via codegen
  })

  test.fixme('should show error when insufficient stock', async ({ page }) => {
    // FIXME: Need to create order with product quantity exceeding stock
  })
})
