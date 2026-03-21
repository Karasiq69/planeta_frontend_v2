import { test, expect } from '@playwright/test'
import { navigateToOrders, createOrderViaUI, openOrder } from '../helpers/order.helpers'
import { expectOrderStatus } from '../helpers/assertions'
import { getSeededData } from '../helpers/api.helpers'

test.describe.serial('Order Create Flow', () => {
  let orderId: string

  test('should create a new order', async ({ page }) => {
    orderId = await createOrderViaUI(page)
    expect(orderId).toBeTruthy()
    await expectOrderStatus(page, 'Заявка')
  })

  test('should attach a client to order', async ({ page }) => {
    await openOrder(page, orderId)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /клиент/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Тест')
    await page.getByText('Клиентов').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Тест Клиентов')).toBeVisible()
  })

  test('should attach a car to order', async ({ page }) => {
    await openOrder(page, orderId)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /автомобиль/i }).click()
    await page.waitForLoadState('networkidle')
    // Select first available car
  })

  test('should change client on order', async ({ page }) => {
    await openOrder(page, orderId)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /сменить|изменить/i }).click()
    await page.getByPlaceholder(/поиск/i).fill('Корпоративный')
    await page.getByText('Корпоративный').click()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Корпоративный')).toBeVisible()
  })

  test('should show order in orders table', async ({ page }) => {
    await navigateToOrders(page)
    // TODO: verify how order ID appears in table
    await expect(page.getByRole('row').filter({ hasText: orderId })).toBeVisible()
  })
})
