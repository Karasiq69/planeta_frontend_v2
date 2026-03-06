# Рефакторинг: mechanics -> employees

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Удалить модуль mechanics, перенести всю логику на employees (механик = employee с position='mechanic')

**Architecture:** Тип `Mechanic` удаляется. `Employee` уже имеет `position: EmployeePosition` (включая `'mechanic'`). Нужно добавить в `Employee` поля `specialization`, `qualifications`, `hourlyRate`. Все API-вызовы `/mechanics` заменяются на `/employees/mechanics` или `/employees/:id`. В orders API `/orders/services/:id/mechanics` заменяется на `/orders/services/:id/employees`.

**Tech Stack:** Next.js 14, TanStack Query, Zod, TypeScript

---

## Task 1: Расширить тип Employee и добавить API для механиков

**Files:**
- Modify: `src/features/employees/types/employees.ts`
- Modify: `src/features/employees/api/actions.ts`
- Modify: `src/features/employees/api/queries.ts`
- Modify: `src/features/employees/api/query-keys.ts`
- Modify: `src/lib/constants.ts`

**Step 1: Расширить тип Employee**

В `src/features/employees/types/employees.ts` добавить nullable-поля для механиков:

```typescript
export interface Employee {
  id: number
  userId: number | null
  organizationId: number
  firstName: string
  lastName: string
  middleName: string | null
  position: EmployeePosition
  phone: string | null
  isActive: boolean
  hiredAt: string | null
  firedAt: string | null
  createdAt: string
  updatedAt: string
  organization?: Organization
  user?: User
  // Поля для механиков (position = 'mechanic')
  specialization?: string
  qualifications?: string
  hourlyRate?: number
}
```

**Step 2: Обновить constants.ts**

В `src/lib/constants.ts`:
- Удалить `MECHANICS_URL` и `ORDER_MECHANICS_URL`
- Добавить `EMPLOYEES_MECHANICS_URL`:

```typescript
export const EMPLOYEES_MECHANICS_URL = '/employees/mechanics'
```

**Step 3: Добавить API-функции для механиков в employees**

В `src/features/employees/api/actions.ts` добавить:

```typescript
import { EMPLOYEES_MECHANICS_URL } from '@/lib/constants'

export const getMechanicEmployeesFn = async (): Promise<Employee[]> => {
  const res = await apiClient.get<Employee[]>(EMPLOYEES_MECHANICS_URL)
  return res.data
}

export const getMechanicsLoadFn = async (): Promise<MechanicLoadItem[]> => {
  const res = await apiClient.get<MechanicLoadItem[]>(`${EMPLOYEES_MECHANICS_URL}/load`)
  return res.data
}
```

(Тип `MechanicLoadItem` импортировать из `@/features/dashboard/types`)

**Step 4: Обновить query-keys**

В `src/features/employees/api/query-keys.ts` добавить ключи для механиков:

```typescript
export const employeesQueryKeys = {
  all: ['employees'] as const,
  lists: () => [...employeesQueryKeys.all, 'list'] as const,
  list: (params?: ListParams) => [...employeesQueryKeys.lists(), params] as const,
  details: () => [...employeesQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...employeesQueryKeys.details(), id] as const,
  byOrganization: (orgId: number) => [...employeesQueryKeys.all, 'organization', orgId] as const,
  mechanics: () => [...employeesQueryKeys.all, 'mechanics'] as const,
  mechanicsLoad: () => [...employeesQueryKeys.all, 'mechanics-load'] as const,
}
```

**Step 5: Добавить query-хуки для механиков**

В `src/features/employees/api/queries.ts` добавить:

```typescript
export const useMechanicEmployees = () => {
  return useQuery({
    queryKey: employeesQueryKeys.mechanics(),
    queryFn: () => getMechanicEmployeesFn(),
  })
}
```

**Step 6: Коммит**

```bash
git add -A
git commit -m "feat: extend Employee type with mechanic fields, add mechanics API to employees"
```

---

## Task 2: Обновить типы и API заказов (orders)

**Files:**
- Modify: `src/features/orders/types/orders.ts`
- Modify: `src/features/orders/api/actions.ts`
- Modify: `src/features/orders/api/mutations.ts`

**Step 1: Обновить типы заказов**

В `src/features/orders/types/orders.ts`:
- Заменить импорт `Mechanic` на `Employee`
- Переименовать `OrderServiceMechanic` -> `OrderServiceEmployee`
- Заменить `mechanicId` -> `employeeId`, `mechanic` -> `employee`
- В `OrderService` переименовать поле `mechanics` -> `employees`

```typescript
import type { Employee } from '@/features/employees/types'

// ... OrderService
export interface OrderService {
  id: number
  orderId: number
  serviceId: number
  defaultDuration: number
  appliedRate: number
  appliedPrice: number
  discountPercent: number
  startTime: string | null
  endTime: string | null
  service: IService
  employees: OrderServiceEmployee[]
}

export interface OrderServiceEmployee {
  id: number
  orderServiceId: number
  employeeId: number
  participationPercentage: number
  paymentType: 'percent' | 'fixed'
  paymentRate: number
  employee: Employee
}
```

**Step 2: Обновить API actions заказов**

В `src/features/orders/api/actions.ts`:
- Заменить импорт `MECHANICS_URL` на `EMPLOYEES_URL`
- Обновить URL-ы: `/orders/services/:id/mechanics` -> `/orders/services/:id/employees`
- Переименовать функции: `addMechanicOrderServiceFn` -> `addEmployeeOrderServiceFn`, `deleteMechanicOrderServiceFn` -> `deleteEmployeeOrderServiceFn`, `updateMechanicOrderServiceFn` -> `updateEmployeeOrderServiceFn`
- В body: `{ mechanicId }` -> `{ employeeId }`

```typescript
import { EMPLOYEES_URL, ORDERS_URL, SERVICES_URL } from '@/lib/constants'

export const addEmployeeOrderServiceFn = async (orderServiceId: number, employeeId: number) => {
  const response = await apiClient.post(
    `${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${EMPLOYEES_URL}`,
    { employeeId }
  )
  return response.data
}

export const deleteEmployeeOrderServiceFn = async (orderServiceId: number, employeeId: number) => {
  const response = await apiClient.delete(
    `${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${EMPLOYEES_URL}/${employeeId}`
  )
  return response.data
}

export const updateEmployeeOrderServiceFn = async (
  orderServiceId: number,
  employeeId: number,
  data: Partial<OrderServiceEmployee>
) => {
  const response = await apiClient.patch(
    `${ORDERS_URL}${SERVICES_URL}/${orderServiceId}${EMPLOYEES_URL}/${employeeId}`,
    data
  )
  return response.data
}
```

**Step 3: Обновить mutations заказов**

В `src/features/orders/api/mutations.ts`:
- Обновить импорты на новые имена функций
- Переименовать хуки: `useAddOrderServiceMechanic` -> `useAddOrderServiceEmployee`, `useUpdateMechanicOrderService` -> `useUpdateEmployeeOrderService`, `useDeleteMechanicOrderService` -> `useDeleteEmployeeOrderService`
- В mutationFn заменить `mechanicId` -> `employeeId`
- Toast-сообщения: "Механик добавлен" -> "Сотрудник добавлен", "Механик обновлен" -> "Сотрудник обновлен", "Механик удален" -> "Сотрудник удален"
- Обновить тип `OrderServiceMechanic` -> `OrderServiceEmployee` в импортах

**Step 4: Коммит**

```bash
git add -A
git commit -m "feat: update orders types and API from mechanics to employees"
```

---

## Task 3: Обновить компоненты заказов

**Files:**
- Modify: `src/features/orders/components/order-tabs/order-services/order-services-table-actions.tsx`
- Modify: `src/features/orders/components/order-tabs/order-services/servicesTabContent.tsx`
- Modify: `src/features/orders/components/order-tabs/order-services/MechanicCard.tsx`
- Modify: `src/features/orders/components/forms/service-mechanic/service-mechanic-form-fields.tsx`
- Modify: `src/features/orders/components/forms/service-mechanic/ServiceMechanicForm.tsx`
- Modify: `src/features/orders/components/forms/service-mechanic/schema.ts`
- Modify: `src/features/orders/hooks/useOrderServiceMechanicForm.ts`
- Modify: `src/features/orders/components/tables/order-mechanics/columns.tsx`
- Modify: `src/features/orders/components/tables/order-mechanics/OrderMechanicTableActions.tsx`
- Modify: `src/features/orders/components/tables/order-services/EmployeeCell.tsx` (если используется)

**Step 1: Обновить все импорты**

Во всех файлах выше заменить:
- `useAllMechanics` -> `useMechanicEmployees` (из `@/features/employees/api/queries`)
- `useAddOrderServiceMechanic` -> `useAddOrderServiceEmployee`
- `useDeleteMechanicOrderService` -> `useDeleteEmployeeOrderService`
- `useUpdateMechanicOrderService` -> `useUpdateEmployeeOrderService`
- `Mechanic` тип -> `Employee` (из `@/features/employees/types`)
- `OrderServiceMechanic` -> `OrderServiceEmployee`

**Step 2: Обновить поля данных**

В компонентах:
- `mechanic.name` -> ``${employee.firstName} ${employee.lastName}``
- `mechanicId` -> `employeeId`
- `item.mechanics` -> `item.employees`
- В schema.ts: `mechanicId` -> `employeeId`

**Step 3: Обновить MechanicCard**

В `MechanicCard.tsx` обновить данные: вместо `mechanic.name` использовать `employee.firstName + ' ' + employee.lastName`.

**Step 4: Обновить order-services-table-actions**

Заменить `useAllMechanics` на `useMechanicEmployees`, обновить поля (id, name -> id, firstName+lastName).

**Step 5: Коммит**

```bash
git add -A
git commit -m "feat: update order components from mechanics to employees"
```

---

## Task 4: Обновить Dashboard

**Files:**
- Modify: `src/features/dashboard/api/actions.ts`
- Modify: `src/features/dashboard/api/queries.ts`
- Modify: `src/features/dashboard/components/filters/DashboardFilters.tsx`
- Modify: `src/features/dashboard/components/charts/MechanicLoadChart.tsx` (при необходимости)
- Possibly: `src/features/dashboard/types/index.ts` (тип `MechanicLoadItem` оставить — это формат ответа API)

**Step 1: Обновить API загруженности механиков**

В `src/features/dashboard/api/actions.ts` изменить URL:
- `getMechanicLoad`: `${DASHBOARD_URL}/mechanic-load` -> использовать `${EMPLOYEES_MECHANICS_URL}/load`

Или оставить как есть, если бекенд всё ещё отдаёт по `/dashboard/mechanic-load`. Уточнить: по спеке новый эндпоинт `GET /employees/mechanics/load`. Обновить:

```typescript
import { EMPLOYEES_MECHANICS_URL } from '@/lib/constants'

export const getMechanicLoad = async (): Promise<MechanicLoadItem[]> => {
  const response = await apiClient.get<MechanicLoadItem[]>(`${EMPLOYEES_MECHANICS_URL}/load`)
  return response.data
}
```

**Step 2: Обновить DashboardFilters**

В `src/features/dashboard/components/filters/DashboardFilters.tsx`:
- Заменить `useAllMechanics` -> `useMechanicEmployees` (из `@/features/employees/api/queries`)
- Обновить отображение: `m.name` -> ``${m.firstName} ${m.lastName}``

**Step 3: Коммит**

```bash
git add -A
git commit -m "feat: update dashboard from mechanics to employees"
```

---

## Task 5: Обновить Payrolls

**Files:**
- Modify: `src/features/payrolls/types/index.ts`
- Check & modify: все компоненты payrolls, использующие `mechanicId`/`mechanicName`

**Step 1: Обновить типы payrolls**

В `src/features/payrolls/types/index.ts`:
- `PayrollMechanicSummary`: `mechanicId` -> `employeeId`, `mechanicName` -> `employeeName`
- `PayrollItem`: `mechanicId` -> `employeeId`, `mechanicName` -> `employeeName`

```typescript
export interface PayrollMechanicSummary {
  employeeId: number
  employeeName: string
  totalAmount: number
  servicesCount: number
}

export interface PayrollItem {
  id: number
  employeeId: number
  employeeName: string
  orderId: number
  servicePrice: number
  paymentType: 'percent' | 'fixed'
  paymentRate: number
  participationPercentage: number
  calculatedAmount: number
}
```

**Step 2: Обновить компоненты payrolls**

Найти все использования `mechanicId`, `mechanicName` в `src/features/payrolls/components/` и заменить на `employeeId`, `employeeName`.

**Step 3: Коммит**

```bash
git add -A
git commit -m "feat: update payrolls from mechanics to employees"
```

---

## Task 6: Обновить навигацию и удалить модуль mechanics

**Files:**
- Modify: `src/components/common/sidebar/nav-settings.tsx`
- Delete: `src/features/mechanics/` (весь модуль)
- Modify: `src/lib/constants.ts` (финальная чистка)

**Step 1: Обновить sidebar**

В `src/components/common/sidebar/nav-settings.tsx`:
- Пункт "Механики" url `/mechanics` -> `/settings/employees` (страница сотрудников уже есть)
- Или убрать отдельный пункт "Механики", т.к. они теперь часть сотрудников

```typescript
{
  title: 'Сотрудники',
  url: '/settings/employees',
  icon: UserRoundCog,
},
```

**Step 2: Удалить модуль mechanics**

Удалить всю папку `src/features/mechanics/`.

**Step 3: Удалить `MECHANICS_URL` и `ORDER_MECHANICS_URL` из constants.ts**

(Если не удалены ранее)

**Step 4: Проверить нет ли оставшихся импортов**

Grep по всему `src/` на:
- `features/mechanics`
- `MECHANICS_URL`
- `useAllMechanics`

Исправить все найденные.

**Step 5: Коммит**

```bash
git add -A
git commit -m "feat: remove mechanics module, update navigation"
```

---

## Task 7: Проверка сборки и финальная чистка

**Step 1: Запустить сборку**

```bash
npm run build
```

Исправить все ошибки TypeScript если есть.

**Step 2: Проверить приложение**

Запустить `npm run dev` и проверить:
- Страница сотрудников (`/settings/employees`) работает
- Заказы: добавление/удаление механиков работает
- Dashboard: фильтр по механикам работает, загруженность отображается
- Sidebar: ссылки обновлены

**Step 3: Финальный коммит**

```bash
git add -A
git commit -m "fix: resolve build errors after mechanics removal"
```
