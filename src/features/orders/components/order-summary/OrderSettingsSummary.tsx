import { useActiveEmployees } from '@/features/employees/api/queries'

import type { Order } from '@/features/orders/types'

type Props = {
  order: Order
}

const formatShortName = (lastName: string, firstName: string) =>
  `${lastName} ${firstName.charAt(0)}.`

export default function OrderSettingsSummary({ order }: Props) {
  const { data: employeesData } = useActiveEmployees()
  const employees = employeesData?.data ?? []

  const dispatcher = order.dispatcherId
    ? employees.find((e) => e.id === order.dispatcherId)
    : null
  const master = order.masterId
    ? employees.find((e) => e.id === order.masterId)
    : null

  const hasAny = order.repairType || dispatcher || master

  if (!hasAny) return null

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
      {order.repairType && <span>{order.repairType}</span>}
      {dispatcher && (
        <span>Диспетчер: {formatShortName(dispatcher.lastName, dispatcher.firstName)}</span>
      )}
      {master && (
        <span>Мастер: {formatShortName(master.lastName, master.firstName)}</span>
      )}
    </div>
  )
}
