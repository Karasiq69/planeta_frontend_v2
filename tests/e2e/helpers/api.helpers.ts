import { request, type APIRequestContext } from '@playwright/test'
import { API_URL } from '../fixtures/test-constants'
import fs from 'fs'
import path from 'path'

let _apiContext: APIRequestContext | null = null

export function getSeededData() {
  const seededDataPath = path.join(__dirname, '../../.auth/seeded-data.json')
  return JSON.parse(fs.readFileSync(seededDataPath, 'utf-8'))
}

export async function getApiContext(): Promise<APIRequestContext> {
  if (_apiContext) return _apiContext

  const seededData = getSeededData()

  _apiContext = await request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: {
      Cookie: seededData.cookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; '),
      'x-organization-id': seededData.organizationId.toString(),
    },
  })

  return _apiContext
}

export async function apiCreateOrder() {
  const api = await getApiContext()
  const res = await api.post('/api/orders')
  if (!res.ok()) throw new Error(`Create order failed: ${res.status()}`)
  return res.json()
}

export async function apiAttachClient(orderId: number, clientId: number) {
  const api = await getApiContext()
  const res = await api.post(`/api/orders/${orderId}/client`, {
    data: { clientId },
  })
  if (!res.ok()) throw new Error(`Attach client failed: ${res.status()}`)
  return res.json()
}

export async function apiAddServiceToOrder(orderId: number, serviceId: number, appliedRate: number, appliedPrice: number) {
  const api = await getApiContext()
  const res = await api.post(`/api/orders/${orderId}/services`, {
    data: { serviceId, appliedRate, appliedPrice },
  })
  if (!res.ok()) throw new Error(`Add service failed: ${res.status()}`)
  return res.json()
}

export async function apiAddMechanicToService(orderServiceId: number, employeeId: number, paymentType: string, paymentRate: number, participationPercentage: number = 100) {
  const api = await getApiContext()
  const res = await api.post(`/api/orders/services/${orderServiceId}/employees`, {
    data: { employeeId, paymentType, paymentRate, participationPercentage },
  })
  if (!res.ok()) throw new Error(`Add mechanic failed: ${res.status()}`)
  return res.json()
}

export async function apiChangeOrderStatus(orderId: number, status: string) {
  const api = await getApiContext()
  const res = await api.patch(`/api/orders/${orderId}/status`, {
    data: { status },
  })
  if (!res.ok()) throw new Error(`Change status failed: ${res.status()}`)
  return res.json()
}

export async function apiCreatePayment(orderId: number, amount: number, method: string, cashRegisterId: number) {
  const api = await getApiContext()
  const res = await api.post('/api/payments', {
    data: { orderId, amount, paymentMethod: method, cashRegisterId },
  })
  if (!res.ok()) throw new Error(`Create payment failed: ${res.status()}`)
  return res.json()
}
