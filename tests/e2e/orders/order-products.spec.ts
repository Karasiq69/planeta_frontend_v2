import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import { expectOrderTotal } from '../helpers/assertions'
import { apiCreateOrder, getSeededData } from '../helpers/api.helpers'
import { TEST_PRODUCTS } from '../fixtures/test-constants'

test.describe.serial('Order Products Flow', () => {
  let orderId: number

  test.beforeAll(async () => {
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id
  })

  test('should add a product to order', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить товар|запчасть/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Масло моторное')
    await page.getByText('Масло моторное 5W-40').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Масло моторное 5W-40')).toBeVisible()
    await expectOrderTotal(page, { parts: parseFloat(TEST_PRODUCTS[0].price) })
  })

  test('should change product quantity', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    const row = page.getByRole('row', { name: /Масло моторное/i })
    const qtyInput = row.getByRole('spinbutton')
    await qtyInput.fill('2')
    await qtyInput.press('Tab')
    await page.waitForLoadState('networkidle')

    await expectOrderTotal(page, { parts: parseFloat(TEST_PRODUCTS[0].price) * 2 })
  })

  test('should add multiple products', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /добавить товар|запчасть/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Фильтр')
    await page.getByText('Фильтр масляный').click()
    await page.waitForLoadState('networkidle')

    const expectedParts = parseFloat(TEST_PRODUCTS[0].price) * 2 + parseFloat(TEST_PRODUCTS[1].price)
    await expectOrderTotal(page, { parts: expectedParts })
  })

  test('should remove product and recalculate', async ({ page }) => {
    await openOrder(page, orderId.toString())

    // TODO: verify selector after codegen
    const row = page.getByRole('row', { name: /Фильтр масляный/i })
    await row.getByRole('button', { name: /удалить/i }).click()

    const confirmBtn = page.getByRole('button', { name: /подтвердить|да|удалить/i })
    if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmBtn.click()
    }
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Фильтр масляный')).not.toBeVisible()
    await expectOrderTotal(page, { parts: parseFloat(TEST_PRODUCTS[0].price) * 2 })
  })
})
