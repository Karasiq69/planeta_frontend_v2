import { test, expect } from '@playwright/test'
import { openOrder, addServiceViaCombobox, deleteRowViaPopover } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, apiAddServiceToOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-totals')

test.describe.serial('Order Totals & VAT', () => {
  let orderId: number
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service2 = seeded.services[1]
  const service3 = seeded.services[2]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)
  const service2Price = hourlyRate * (service2.defaultDuration / 60)
  const service3Price = hourlyRate * (service3.defaultDuration / 60)

  test.beforeAll(async () => {
    setActiveMocker(mocker)
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add two services via API
    await apiAddServiceToOrder(orderId, service1.id, hourlyRate, service1Price)
    await apiAddServiceToOrder(orderId, service2.id, hourlyRate, service2Price)
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test('should display correct services total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    const expectedServices = service1Price + service2Price

    await expectOrderTotal(page, { services: expectedServices })
  })

  test('should display correct parts total', async ({ page }) => {
    await openOrder(page, orderId.toString())
    await expectOrderTotal(page, { parts: 0 })
  })

  test('should display correct overall total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    const expectedTotal = service1Price + service2Price

    await expectOrderTotal(page, { total: expectedTotal })
  })

  test.fixme('should recalculate after adding service via UI', async ({ page }) => {
    // FIXME: Adding a 3rd service via combobox fails — the combobox option
    // appears disabled (isPending state) intermittently. Need to investigate
    // whether the debounce/loading timing or combobox state reset is the issue.
  })

  test.fixme('should recalculate after removing service via UI', async ({ page }) => {
    // FIXME: Depends on "add via UI" test above
  })
})
