import { test, expect } from '@playwright/test'
import { openOrder } from '../helpers/order.helpers'
import {
  apiCreateOrder,
  apiAddServiceToOrder,
  apiChangeOrderStatus,
  getSeededData,
} from '../helpers/api.helpers'
import { TEST_SERVICE_PRICES, PAYMENT_METHODS } from '../fixtures/test-constants'

test.describe.serial('Order Payment Flow', () => {
  let orderId: number
  const servicePrice = TEST_SERVICE_PRICES['Замена масла'].appliedPrice

  test.beforeAll(async () => {
    const seeded = getSeededData()
    const order = await apiCreateOrder()
    orderId = order.id || order.data?.id

    // Add service
    await apiAddServiceToOrder(
      orderId,
      seeded.serviceIds[0],
      TEST_SERVICE_PRICES['Замена масла'].appliedRate,
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice
    )

    // Move to a payable status
    await apiChangeOrderStatus(orderId, 'ORDER')
    await apiChangeOrderStatus(orderId, 'IN_PROGRESS')
  })

  test('should accept partial payment', async ({ page }) => {
    await openOrder(page, orderId.toString())
    const partialAmount = Math.floor(servicePrice / 2)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /оплата|принять оплату/i }).click()
    await page.getByLabel(/сумма/i).fill(partialAmount.toString())
    await page.getByLabel(/метод|способ/i).selectOption(PAYMENT_METHODS.CASH)
    await page.getByRole('button', { name: /принять|оплатить|подтвердить/i }).click()
    await page.waitForLoadState('networkidle')

    // Verify remaining balance
    const remaining = servicePrice - partialAmount
    await expect(page.getByText(remaining.toString())).toBeVisible()
  })

  test('should accept full remaining payment', async ({ page }) => {
    await openOrder(page, orderId.toString())
    const remaining = servicePrice - Math.floor(servicePrice / 2)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /оплата|принять оплату/i }).click()
    await page.getByLabel(/сумма/i).fill(remaining.toString())
    await page.getByLabel(/метод|способ/i).selectOption(PAYMENT_METHODS.CARD)
    await page.getByRole('button', { name: /принять|оплатить|подтвердить/i }).click()
    await page.waitForLoadState('networkidle')

    // Verify fully paid
    // TODO: verify "Оплачен" status or zero remaining balance
  })

  test('should show all payment methods', async ({ page }) => {
    // Create a new order for this test
    const seeded = getSeededData()
    const newOrder = await apiCreateOrder()
    const newOrderId = (newOrder.id || newOrder.data?.id).toString()
    await apiAddServiceToOrder(
      parseInt(newOrderId),
      seeded.serviceIds[1],
      TEST_SERVICE_PRICES['Диагностика'].appliedRate,
      TEST_SERVICE_PRICES['Диагностика'].appliedPrice
    )
    await apiChangeOrderStatus(parseInt(newOrderId), 'ORDER')
    await apiChangeOrderStatus(parseInt(newOrderId), 'IN_PROGRESS')

    await openOrder(page, newOrderId)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /оплата|принять оплату/i }).click()

    // Verify all 4 methods are available
    const methodSelect = page.getByLabel(/метод|способ/i)
    await expect(methodSelect.getByText(/наличные|cash/i)).toBeVisible()
    await expect(methodSelect.getByText(/карта|card/i)).toBeVisible()
    await expect(methodSelect.getByText(/перевод|transfer/i)).toBeVisible()
    await expect(methodSelect.getByText(/онлайн|online/i)).toBeVisible()
  })

  test('should reject overpayment', async ({ page }) => {
    const seeded = getSeededData()
    const newOrder = await apiCreateOrder()
    const newOrderId = (newOrder.id || newOrder.data?.id).toString()
    await apiAddServiceToOrder(
      parseInt(newOrderId),
      seeded.serviceIds[0],
      TEST_SERVICE_PRICES['Замена масла'].appliedRate,
      TEST_SERVICE_PRICES['Замена масла'].appliedPrice
    )
    await apiChangeOrderStatus(parseInt(newOrderId), 'ORDER')
    await apiChangeOrderStatus(parseInt(newOrderId), 'IN_PROGRESS')

    await openOrder(page, newOrderId)

    // TODO: verify selector after codegen
    await page.getByRole('button', { name: /оплата|принять оплату/i }).click()
    const overpayAmount = servicePrice * 2
    await page.getByLabel(/сумма/i).fill(overpayAmount.toString())
    await page.getByRole('button', { name: /принять|оплатить|подтвердить/i }).click()

    // Should show error
    // TODO: verify error message for overpayment
    await expect(page.getByText(/превышает|ошибка|невозможно/i)).toBeVisible()
  })
})
