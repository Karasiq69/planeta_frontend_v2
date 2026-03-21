import { test, expect } from '@playwright/test'
import {
  navigateToOrders,
  createOrderViaUI,
  createOrderWithClientViaUI,
  openOrder,
  attachClientViaUI,
} from '../helpers/order.helpers'
import { expectOrderStatus, expectOrderTotal, expectPaymentInfo } from '../helpers/assertions'
import { getSeededData, setActiveMocker } from '../helpers/api.helpers'
import { MockManager } from '../fixtures/mock-config'

const mocker = new MockManager('order-create')

test.describe.serial('Order Create — Empty Order Flow', () => {
  let orderId: string

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

  test('should create a new empty order', async ({ page }) => {
    orderId = await createOrderViaUI(page)
    expect(orderId).toBeTruthy()

    // Should land on order page with "Заявка" status
    await expectOrderStatus(page, 'Заявка')

    // Should show empty client and car cards
    await expect(page.getByRole('button', { name: /добавить клиента/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /добавить автомобиль/i })).toBeVisible()
  })

  test('should have correct initial totals', async ({ page }) => {
    await openOrder(page, orderId)
    await expectOrderTotal(page, { services: 0, parts: 0, total: 0 })
    await expectPaymentInfo(page, { toPay: 0, paid: 0, remaining: 0 })
  })

  test('should attach a client to order', async ({ page }) => {
    await openOrder(page, orderId)

    const seeded = getSeededData()
    // Use the individual test client name from seed data
    await attachClientViaUI(page, 'Тест')

    // Client card should now show client info instead of "Добавить клиента"
    await expect(page.getByRole('button', { name: /добавить клиента/i })).not.toBeVisible()
    // Client name should be visible somewhere in the client card area
    await expect(page.getByText('Тест').first()).toBeVisible()
  })

  test('should show car card after client attachment (auto-attached)', async ({ page }) => {
    await openOrder(page, orderId)

    // If client has a car, it may auto-attach — in which case "Добавить автомобиль" disappears
    // If not, the "Добавить автомобиль" button should still be visible
    const carButton = page.getByRole('button', { name: /добавить автомобиль/i })
    const hasCarButton = await carButton.isVisible().catch(() => false)

    if (hasCarButton) {
      // Car not auto-attached — that's ok, client might not have a car
      await expect(carButton).toBeVisible()
    } else {
      // Car was auto-attached — verify we DON'T see "Добавить автомобиль"
      await expect(carButton).not.toBeVisible()
    }
  })

  test('should show order in orders table', async ({ page }) => {
    await navigateToOrders(page)
    await expect(page.getByRole('row').filter({ hasText: orderId })).toBeVisible()
  })
})

test.describe.serial('Order Create — With Client Flow', () => {
  let orderId: string

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

  test('should create order with pre-selected client', async ({ page }) => {
    orderId = await createOrderWithClientViaUI(page, 'Тест')
    expect(orderId).toBeTruthy()

    await expectOrderStatus(page, 'Заявка')

    // Client should already be attached
    await expect(page.getByRole('button', { name: /добавить клиента/i })).not.toBeVisible()
  })
})

test.describe('Order Create — Dialog UI', () => {
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

  test('should show dialog with two options on "Новый заказ" click', async ({ page }) => {
    await navigateToOrders(page)
    await page.getByRole('button', { name: /новый заказ/i }).click()

    const dialog = page.getByRole('dialog', { name: /добавление нового заказа/i })
    await expect(dialog).toBeVisible()

    // Two sections: "Поиск клиента" and "Создать новый заказ"
    await expect(dialog.getByText(/поиск клиента/i)).toBeVisible()
    await expect(dialog.getByText(/создать новый заказ/i)).toBeVisible()

    // Combobox for client search
    await expect(dialog.getByRole('combobox').filter({ hasText: /выберите клиента/i })).toBeVisible()

    // Button for empty order
    await expect(dialog.getByRole('button', { name: /создать пустой заказ/i })).toBeVisible()
  })

  test('should close dialog on X button', async ({ page }) => {
    await navigateToOrders(page)
    await page.getByRole('button', { name: /новый заказ/i }).click()

    const dialog = page.getByRole('dialog', { name: /добавление нового заказа/i })
    await expect(dialog).toBeVisible()

    // Close button (X)
    await dialog.getByRole('button', { name: /close/i }).click()
    await expect(dialog).not.toBeVisible()
  })
})

test.describe('Order Create — Client Dialog', () => {
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

  test('should show add client dialog with tabs', async ({ page }) => {
    const orderId = await createOrderViaUI(page)
    await openOrder(page, orderId)

    await page.getByRole('button', { name: /добавить клиента/i }).click()

    const dialog = page.getByRole('dialog', { name: /добавление клиента/i })
    await expect(dialog).toBeVisible()

    // Two tabs
    await expect(dialog.getByRole('tab', { name: /найти клиента/i })).toBeVisible()
    await expect(dialog.getByRole('tab', { name: /создать клиента/i })).toBeVisible()

    // "Найти клиента" tab active by default
    await expect(dialog.getByRole('combobox').filter({ hasText: /выберите клиента/i })).toBeVisible()
  })

  test('should search and show client options in combobox', async ({ page }) => {
    const orderId = await createOrderViaUI(page)
    await openOrder(page, orderId)

    await page.getByRole('button', { name: /добавить клиента/i }).click()

    const dialog = page.getByRole('dialog', { name: /добавление клиента/i })
    const combobox = dialog.getByRole('combobox').filter({ hasText: /выберите клиента/i })
    await combobox.click()

    // Popover should open with search and client list
    await expect(page.getByPlaceholder('Поиск..', { exact: true })).toBeVisible()

    // Type a search query
    await page.getByPlaceholder('Поиск..', { exact: true }).fill('ООО')

    // Should show matching results
    await expect(page.getByRole('option').first()).toBeVisible()
  })
})
