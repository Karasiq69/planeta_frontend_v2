import { request, type APIRequestContext } from '@playwright/test'
import { API_URL } from '../fixtures/test-constants'
import { RECORD_MODE, MockManager } from '../fixtures/mock-config'
import fs from 'fs'
import path from 'path'

let _apiContext: APIRequestContext | null = null
let _activeMocker: MockManager | null = null

/** Set by each spec's beforeAll to route API helper calls through mocks */
export function setActiveMocker(mocker: MockManager | null) {
  _activeMocker = mocker
}

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

/** Generic API call — replays from mocks or records real responses */
async function apiCall(method: string, apiPath: string, data?: unknown): Promise<unknown> {
  const fullPath = `/api${apiPath}`

  // REPLAY MODE — return from mock store
  if (!RECORD_MODE && _activeMocker) {
    const entry = _activeMocker.getMockResponse(method, fullPath)
    if (entry) return entry.body
    throw new Error(`No mock for ${method} ${fullPath}`)
  }

  // RECORD MODE or no mocker — call real API
  const api = await getApiContext()
  let res
  switch (method) {
    case 'POST':
      res = await api.post(fullPath, { data })
      break
    case 'PATCH':
      res = await api.patch(fullPath, { data })
      break
    case 'GET':
      res = await api.get(fullPath)
      break
    default:
      throw new Error(`Unsupported method: ${method}`)
  }
  if (!res.ok()) throw new Error(`${method} ${fullPath} failed: ${res.status()}`)
  const body = await res.json()

  // In record mode, save this response to the active mocker
  if (RECORD_MODE && _activeMocker) {
    _activeMocker.recordEntry(`${method} ${fullPath}`, { status: res.status(), body })
  }

  return body
}

export async function apiCreateOrder() {
  return apiCall('POST', '/orders')
}

export async function apiAttachClient(orderId: number, clientId: number) {
  return apiCall('POST', `/orders/${orderId}/client`, { clientId })
}

export async function apiAddServiceToOrder(orderId: number, serviceId: number, appliedRate: number, appliedPrice: number) {
  return apiCall('POST', `/orders/${orderId}/services`, { serviceId, appliedRate, appliedPrice })
}

export async function apiAddMechanicToService(orderServiceId: number, employeeId: number, paymentType: string, paymentRate: number, participationPercentage: number = 100) {
  return apiCall('POST', `/orders/services/${orderServiceId}/employees`, { employeeId, paymentType, paymentRate, participationPercentage })
}

export async function apiChangeOrderStatus(orderId: number, status: string) {
  return apiCall('PATCH', `/orders/${orderId}/status`, { status })
}

export async function apiCreatePayment(orderId: number, amount: number, method: string, cashRegisterId: number) {
  return apiCall('POST', '/payments', { orderId, amount, paymentMethod: method, cashRegisterId })
}
