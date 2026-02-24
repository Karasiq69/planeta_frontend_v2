import { MoreVertical, Pencil, RefreshCw, Trash2, User, UserPlus, XCircle } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { IClient } from '@/features/clients/types'

interface CarOwnerCardProps {
  owner: IClient
  onEdit: () => void
}

export default function CarOwnerCard({ owner, onEdit }: CarOwnerCardProps) {
  const { firstName, lastName, phone, email } = owner

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <div className="flex items-center  gap-2">
            <User className='w-5 h-5' />
            Владелец и контакты
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              <DropdownMenuItem>
                <Pencil className='mr-2 h-4 w-4' />
                <span>Редактировать клиента</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className='mr-2 h-4 w-4' />
                <span>Заменить клиента</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className='mr-2 h-4 w-4' />
                <span>Очистить клиента</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-red-600'>
                <Trash2 className='mr-2 h-4 w-4' />
                <span>Удалить клиента</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 md:grid-cols-2'>
          <div>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='text-gray-500'>ФИО:</span> {`${firstName} ${lastName}`}
              </p>
              <p>
                <span className='text-gray-500'>Телефон:</span> {phone}
              </p>
              <p>
                <span className='text-gray-500'>Email:</span> {email}
              </p>
            </div>
          </div>
          <div>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='text-gray-500'>Предпочтительное время:</span> После 17:00
              </p>
              <p>
                <span className='text-gray-500'>Дата регистрации:</span> 15.03.2023
              </p>
              <div>
                <span className='text-gray-500'>Статус:</span> <Badge>VIP клиент</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
