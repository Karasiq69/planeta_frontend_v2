import * as React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import OrderMechanicTableActions from '@/features/orders/components/tables/order-mechanics/OrderMechanicTableActions'

import type { OrderServiceEmployee } from '@/features/orders/types'
import type { ColumnDef } from '@tanstack/react-table'

export const orderMechanicsColumnsDefs: ColumnDef<OrderServiceEmployee>[] = [
  {
    accessorKey: 'employee',
    header: () => <span>Механик</span>,
    cell: ({ row }) => {
      const employee = row.original.employee
      const fullName = `${employee.firstName} ${employee.lastName}`
      return (
        <div className='flex items-center gap-3'>
          <Avatar className='size-7'>
            <AvatarFallback>{fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <span className='text-sm font-medium'>{fullName}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'participationPercentage',
    header: () => <span>% участия</span>,
    cell: ({ row }) => {
      return (
        <p className='font-medium flex gap-1 items-center'>
          {row.original.participationPercentage}
          <span className="text-xs text-muted-foreground">%</span>
        </p>
      )
    },
  },
  // {
  //     accessorKey: "paymentType",
  //     header: () => <span>Вид оплаты</span>,
  //     cell: ({ row }) => {
  //         return (
  //             <p className="font-medium flex gap-1 items-center">
  //                 {row.original.paymentType}
  //             </p>
  //         )
  //     }
  // },
  // {
  //     accessorKey: "paymentRate",
  //     header: () => <span>Размер</span>,
  //     cell: ({ row }) => {
  //         const rate = row.original.paymentRate
  //         const type = row.original.paymentType === 'percent' ? '%' : '₽/ч'
  //         return (
  //             <div className="font-medium">
  //                 {rate} {type}
  //             </div>
  //         )
  //     }
  // },
  {
    accessorKey: 'total_payment',
    header: () => <div className="">Итого</div>,
    cell: ({ row }) => (
      <div className='space-x-1 '>
        <span>{row.original.paymentRate}</span>
        <span className='text-xs text-muted-foreground'>руб.</span>
      </div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      return <OrderMechanicTableActions row={row} />
    },
  },
]
