import { test, expect } from '@playwright/test'
import { openOrder, addProductViaCombobox, deleteRowViaPopover } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-products')

test.describe.serial('Order Products Flow', () => {
  let orderId: number
  const seeded = getSeededData()
  const product1 = seeded.products[0]
  const product2 = seeded.products[1]
  const product1Price = parseFloat(product1.price)
  const product2Price = parseFloat(product2.price)

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

  test('should add a product to order', async ({ page }) => {
    await openOrder(page, orderId.toString())

    await addProductViaCombobox(page, product1.name)

    await expect(page.getByRole('row').filter({ hasText: product1.name })).toBeVisible()
    await expectOrderTotal(page, { parts: product1Price })
  })

  test.fixme('should change product quantity', async ({ page }) => {
    // FIXME: Product row action buttons might be hover-only or positioned differently
    // Need to investigate via browser inspector: which button opens edit dialog,
    // what the dialog contains, and how quantity is updated.
    // Known: product row shows qty as text "1шт." — no inline spinbutton
  })

  test('should add multiple products', async ({ page }) => {
    await openOrder(page, orderId.toString())

    await addProductViaCombobox(page, product2.name)

    // qty of product1 is still 1 (change qty test is fixme'd)
    const expectedParts = product1Price + product2Price
    await expectOrderTotal(page, { parts: expectedParts })
  })

  test('should remove product and recalculate', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // Switch to products tab
    await page.getByRole('tab', { name: /товары и запчасти/i }).click()

    // Delete product2 via Trash2 icon → popover "Удалить" pattern
    const row = page.getByRole('row', { name: new RegExp(product2.name, 'i') })
    await deleteRowViaPopover(page, row)

    await expect(page.getByRole('row').filter({ hasText: product2.name })).not.toBeVisible()
    await expectOrderTotal(page, { parts: product1Price })
  })
})
