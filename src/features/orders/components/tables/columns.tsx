import * as React from 'react'

import LicensePlate from '@/components/cars/LicensePlate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { getBrandLogo } from '@/features/cars/utils'
import OrderTableActions from '@/features/orders/components/tables/OrderTableActions'
import { getStatusData } from '@/features/orders/lib/statuses'
import { MoneyCell, StatusCell } from '@/components/common/table/cells'

import type { Order, PaymentStatus } from '@/features/orders/types'
import type { ColumnDef } from '@tanstack/react-table'

const statusTabColors: Record<string, string> = {
  APPLICATION: 'bg-gray-300',
  ORDER: 'bg-sky-300',
  WAITING_WAREHOUSE: 'bg-amber-300',
  IN_PROGRESS: 'bg-violet-300',
  WAITING_PAYMENT: 'bg-emerald-300',
  COMPLETED: 'bg-green-300',
  CANCELLED: 'bg-rose-300',
}

export const OrdersColumnDefs: ColumnDef<Order>[] = [
  {
    id: 'statusTab',
    header: () => null,
    size: 8,
    cell: ({ row }) => {
      const status = row.original.status?.toUpperCase() ?? ''
      const { label } = getStatusData(row.original.status)
      return <StatusCell color={statusTabColors[status] ?? 'bg-gray-300'} tooltip={label} />
    },
  },
  {
    accessorKey: 'status',
    meta: 'Статус',
  },
  {
    accessorKey: 'id',
    meta: '№ Заказа',
    header: () => <div>№ Заказа</div>,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <p className='font-medium m-0'>{String(order.id).padStart(6, '0')}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'client',
    meta: 'Клиент',
    header: () => <div>Клиент</div>,
    cell: ({ row }) => {
      const client = row.original.client

      const fullName = `${row.original.client?.firstName || ''} ${row.original.client?.lastName || ''}`
      return (
        <div>
          <p className='font-medium m-0 lg:text-nowrap'>{fullName}</p>
          <span className='text-xs text-muted-foreground'>{client?.phone}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'car',
    meta: 'Автомобиль',
    header: () => <div>Автомобиль</div>,
    cell: ({ row }) => {
      const car = row.original?.car
      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={getBrandLogo(car?.brand)} />
            <AvatarFallback>{car?.brand?.name?.charAt(0) || 'B'}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="flex font-normal text-sm items-center gap-2">
              {car?.vin}
              <span className="font-normal text-xs text-muted-foreground"> {car?.year}</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              {car?.model?.code} {car?.model?.series} {car?.model?.name}
            </CardDescription>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'licencePlate',
    meta: 'Госномер',
    header: () => <div>Госномер</div>,
    cell: ({ row }) => <LicensePlate licensePlate={row.original?.car?.licensePlate} />,
  },
  {
    accessorKey: 'totalCost',
    meta: 'Стоимость',
    header: () => <div>Стоимость</div>,
    cell: ({ row }) => <MoneyCell value={row.original.totalCost} />,
  },
  {
    accessorKey: 'reasonToApply',
    meta: 'Причина обращения',
    header: () => <div>Причина обращения</div>,
    size: 200,
    cell: ({ row }) => (
      <div className='max-w-[200px]'>
        <p className='m-0 line-clamp-2 text-xs text-muted-foreground'>{row.original.reasonToApply || '—'}</p>
      </div>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    meta: 'Оплата',
    header: () => <div>Оплата</div>,
    cell: ({ row }) => {
      const status = row.original.paymentStatus as PaymentStatus | null | undefined
      if (!status) return <span className='text-muted-foreground'>—</span>
      const config: Record<PaymentStatus, { label: string; className: string }> = {
        UNPAID: { label: 'Не оплачен', className: 'text-rose-600 bg-rose-50' },
        PAID: { label: 'Оплачен', className: 'text-green-600 bg-green-50' },
        PARTIAL: { label: 'Частично', className: 'text-amber-600 bg-amber-50' },
      }
      const entry = config[status]
      if (!entry) return <span className='text-muted-foreground'>{status}</span>
      return <span className={`${entry.className} px-2 py-1 rounded-md text-xs`}>{entry.label}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const orderId = row?.original?.id
      return <OrderTableActions orderId={orderId} />
    },
  },
]
