import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import type { OrderServiceEmployee } from '@/features/orders/types'

interface MechanicCardProps {
  employee: OrderServiceEmployee
}

export const MechanicCard = ({ employee }: MechanicCardProps) => {
  const fullName = `${employee.employee.firstName} ${employee.employee.lastName}`
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
  const logoUrl = ''

  const getPaymentTypeText = (type: 'percent' | 'fixed') => {
    return type === 'percent' ? 'Процент' : 'Фиксированный'
  }

  return (
    <div className='flex items-center justify-between gap-3 p-2 bg-white rounded-md shadow-xs border'>
      <div className='flex gap-2 items-center'>
        <Avatar className='size-7'>
          <AvatarImage src={logoUrl} />
          <AvatarFallback className='bg-blue-100'>{initials}</AvatarFallback>
        </Avatar>

        <div className='text-sm text-muted-foreground min-w-[120px] truncate'>
          <p>{fullName}</p>
          <p className='text-xs'>{employee.employee.specialization}</p>
        </div>
      </div>

      <div className='text-sm text-muted-foreground'>
        {getPaymentTypeText(employee.paymentType)}
      </div>

      <div className='text-sm text-muted-foreground'>{employee.participationPercentage}%</div>

      <div className='text-sm text-muted-foreground'>{employee.paymentRate}</div>
    </div>
  )
}
