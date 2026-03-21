import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-mechanics')

// TODO: Mechanic assignment UI needs investigation
// The service row has icon buttons in the Actions column, but the mechanic
// assignment popover structure (role="option" vs role="menuitem") needs
// to be verified via Playwright codegen or browser accessibility inspector.
// Known: mechanics exist in DB (22), mechanic action button position unknown.
test.describe.serial('Order Mechanics Flow', () => {
  let orderId: number
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)
  const hasMechanics = seeded.mechanicIds.length >= 2

  test.beforeAll(async () => {
    setActiveMocker(mocker)
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id
    await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test.fixme('should assign mechanic to service', async ({ page }) => {
    // FIXME: Need to identify which icon button opens mechanic popover
    // and what role the mechanic items have (option/menuitem/checkbox)
  })

  test.fixme('should show mechanic earning calculation', async ({ page }) => {
    // FIXME: Depends on mechanic assignment working first
  })

  test.fixme('should assign second mechanic and split participation', async ({ page }) => {
    // FIXME: Depends on mechanic assignment working first
  })

  test.fixme('should remove mechanic', async ({ page }) => {
    // FIXME: Need to understand toggle/uncheck behavior
  })
})
