import { test, expect } from '@playwright/test'
import { openOrder, addServiceViaCombobox, deleteRowViaPopover } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-services')

test.describe.serial('Order Services Flow', () => {
  let orderId: number
  const seeded = getSeededData()
  const hourlyRate = seeded.organizationHourlyRate ?? 4900
  const service1 = seeded.services[0]
  const service2 = seeded.services[1]
  const service1Price = hourlyRate * (service1.defaultDuration / 60)
  const service2Price = hourlyRate * (service2.defaultDuration / 60)

  test.beforeAll(async () => {
    setActiveMocker(mocker)
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id
  })

  test.beforeEach(async ({ page }) => {
    await mocker.setupPage(page)
  })

  test.afterAll(async () => {
    await mocker.teardown()
    setActiveMocker(null)
  })

  test('should add a service to order', async ({ page }) => {
    await openOrder(page, orderId.toString())

    await addServiceViaCombobox(page, service1.name)

    // Verify service appears in the table (not just combobox)
    await expect(page.getByRole('row').filter({ hasText: service1.name })).toBeVisible()
    await expectOrderTotal(page, { services: service1Price })
  })

  test('should add multiple services and verify total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    await addServiceViaCombobox(page, service2.name)

    const expectedTotal = service1Price + service2Price

    await expectOrderTotal(page, { services: expectedTotal })
  })

  test('should remove a service and recalculate total', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // Switch to services tab
    await page.getByRole('tab', { name: /работы/i }).click()

    // Find service row and delete via Trash2 icon → popover "Удалить" pattern
    const row = page.getByRole('row', { name: new RegExp(service2.name, 'i') })
    await deleteRowViaPopover(page, row)

    await expect(page.getByText(service2.name)).not.toBeVisible()
    await expectOrderTotal(page, { services: service1Price })
  })
})
