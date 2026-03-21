import { type Page, expect } from '@playwright/test'

export async function navigateToOrders(page: Page) {
  await page.goto('/orders')
  // Wait for the page to render (the "Новый заказ" button indicates the orders page is ready)
  await expect(page.getByRole('button', { name: /новый заказ/i })).toBeVisible({ timeout: 15_000 })
}

export async function createOrderViaUI(page: Page): Promise<string> {
  await navigateToOrders(page)

  // Click "Новый заказ" button (green, top-right)
  await page.getByRole('button', { name: /новый заказ/i }).click()

  // Dialog: "Добавление нового заказа" appears with two options
  const dialog = page.getByRole('dialog', { name: /добавление нового заказа/i })
  await expect(dialog).toBeVisible()

  // Click "Создать пустой заказ" button
  await dialog.getByRole('button', { name: /создать пустой заказ/i }).click()

  // Wait for redirect to /orders/:id
  await page.waitForURL(/\/orders\/\d+/)
  const url = page.url()
  const orderId = url.split('/orders/')[1]
  return orderId
}

export async function createOrderWithClientViaUI(page: Page, clientName: string): Promise<string> {
  await navigateToOrders(page)

  await page.getByRole('button', { name: /новый заказ/i }).click()

  const dialog = page.getByRole('dialog', { name: /добавление нового заказа/i })
  await expect(dialog).toBeVisible()

  // "Поиск клиента" tab is active by default — use combobox
  const combobox = dialog.getByRole('combobox').filter({ hasText: /выберите клиента/i })
  await combobox.click()

  // Search in the opened popover
  await page.getByPlaceholder('Поиск..', { exact: true }).fill(clientName)
  await page.getByRole('option', { name: new RegExp(clientName, 'i') }).first().click()

  // Wait for redirect to /orders/:id
  await page.waitForURL(/\/orders\/\d+/, { timeout: 10_000 })
  const url = page.url()
  const orderId = url.split('/orders/')[1]
  return orderId
}

export async function openOrder(page: Page, orderId: string) {
  await page.goto(`/orders/${orderId}`)
  // Wait for order page to render (heading with order number)
  await expect(page.getByRole('heading').filter({ hasText: /№/ })).toBeVisible({ timeout: 15_000 })
}

export async function attachClientViaUI(page: Page, clientName: string) {
  // Click "Добавить клиента" on the empty client card
  await page.getByRole('button', { name: /добавить клиента/i }).click()

  // Dialog: "Добавление клиента"
  const dialog = page.getByRole('dialog', { name: /добавление клиента/i })
  await expect(dialog).toBeVisible()

  // "Найти клиента" tab is active by default
  const combobox = dialog.getByRole('combobox').filter({ hasText: /выберите клиента/i })
  await combobox.click()

  await page.getByPlaceholder('Поиск..', { exact: true }).fill(clientName)
  await page.getByRole('option', { name: new RegExp(clientName, 'i') }).first().click()

  // Wait for client card to update
  await expect(page.getByRole('button', { name: /добавить клиента/i })).not.toBeVisible({ timeout: 10_000 })
}

export async function attachCarViaUI(page: Page, carQuery: string) {
  // Click "Добавить автомобиль" on the empty car card
  await page.getByRole('button', { name: /добавить автомобиль/i }).click()

  // Dialog opens — "Найти автомобиль" tab by default
  const dialog = page.getByRole('dialog').filter({ hasText: /автомобиль/i })
  await expect(dialog).toBeVisible()

  const combobox = dialog.getByRole('combobox').first()
  await combobox.click()

  await page.getByPlaceholder(/поиск/i).fill(carQuery)
  await page.getByRole('option').first().click()

  await expect(dialog).not.toBeVisible({ timeout: 10_000 })
}

export async function changeOrderStatusViaUI(page: Page, nextStatusLabel: string) {
  // Status selector: [< prevButton | currentStatus dropdown | nextButton >]
  // Try prev/next buttons first, fall back to dropdown for non-adjacent statuses

  // The status selector is: [< prevButton | currentDropdown | nextButton >]
  // Scoped to the status bar container
  const statusBar = page.locator('.rounded-lg.border.bg-muted\\/40')

  // Try prev/next buttons first (they show adjacent statuses)
  const directButton = statusBar.getByRole('button').filter({ hasText: new RegExp(`^\\s*${escapeRegex(nextStatusLabel)}\\s*$`, 'i') })
  const isDirectVisible = await directButton.isVisible({ timeout: 1000 }).catch(() => false)

  if (isDirectVisible && await directButton.isEnabled()) {
    await directButton.click()
  } else {
    // Open dropdown (click center button — the status trigger)
    const buttons = statusBar.locator('button')
    // Middle button (index 1) is the dropdown trigger
    await buttons.nth(1).click()
    await page.waitForTimeout(300)

    // Click the menu item
    await page.getByRole('menuitem').filter({ hasText: new RegExp(nextStatusLabel, 'i') }).click()
  }

  // Confirmation dialog appears: "Сменить статус заказа?"
  const confirmDialog = page.getByRole('alertdialog')
  await expect(confirmDialog).toBeVisible({ timeout: 5000 })
  await confirmDialog.getByRole('button', { name: /подтвердить/i }).click()

  // Wait for status to update
  await expect(confirmDialog).not.toBeVisible({ timeout: 10_000 })
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function addServiceViaCombobox(page: Page, serviceName: string) {
  // Switch to "Работы" tab
  await page.getByRole('tab', { name: /работы/i }).click()

  // The combobox may show "Поиск услуг" (placeholder) or a previously selected service name.
  // Click the first combobox in the services tab content area.
  const servicesTab = page.locator('[role="tabpanel"]')
  const combobox = servicesTab.getByRole('combobox').first()
  await combobox.click()

  // Use first few words for search (long names break search)
  const searchTerm = serviceName.split(' ').slice(0, 3).join(' ')
  await page.getByPlaceholder('Поиск..', { exact: true }).fill(searchTerm)

  // Wait for results to load (items are disabled while isPending)
  const option = page.getByRole('option').filter({ hasText: serviceName }).first()
  await expect(option).toBeVisible({ timeout: 10_000 })
  // Wait until option is not disabled (isPending = false)
  await expect(option).toBeEnabled({ timeout: 10_000 })
  await option.click()

  // Wait for the service to appear in the table
  await expect(page.getByRole('row').filter({ hasText: serviceName })).toBeVisible({ timeout: 10_000 })
}

export async function addProductViaCombobox(page: Page, productName: string) {
  // Switch to "Товары и Запчасти" tab
  await page.getByRole('tab', { name: /товары и запчасти/i }).click()

  // The combobox may show "Поиск товаров" (placeholder) or a previously selected product name.
  const productsTab = page.locator('[role="tabpanel"]')
  const combobox = productsTab.getByRole('combobox').first()
  await combobox.click()

  // Use first few words for search
  const searchTerm = productName.split(' ').slice(0, 2).join(' ')
  await page.getByPlaceholder('Поиск..', { exact: true }).fill(searchTerm)

  // Wait for results to load (items are disabled while isPending)
  const option = page.getByRole('option').filter({ hasText: productName }).first()
  await expect(option).toBeVisible({ timeout: 10_000 })
  await expect(option).toBeEnabled({ timeout: 10_000 })
  await option.click()

  // Wait for the product to appear in the table
  await expect(page.getByRole('row').filter({ hasText: productName })).toBeVisible({ timeout: 10_000 })
}

/**
 * Delete a row via the Trash2 icon-button → popover "Удалить" pattern.
 * The Trash2 icon button is the last button in the row actions area.
 * Clicking it opens a Popover with a destructive "Удалить" confirmation button.
 */
export async function deleteRowViaPopover(page: Page, row: import('@playwright/test').Locator) {
  // The actions cell contains icon buttons: [UserPlus?, Pencil?, Copy?, Trash2]
  // Trash2 is always the last button in the row
  const buttons = row.getByRole('button')
  const lastButton = buttons.last()
  await lastButton.click()

  // Popover appears with a destructive "Удалить" button
  const deleteConfirm = page.getByRole('button', { name: /^удалить$/i })
  await expect(deleteConfirm).toBeVisible({ timeout: 3_000 })
  await deleteConfirm.click()

  // Wait for the row to disappear
  await expect(row).not.toBeVisible({ timeout: 10_000 })
}
