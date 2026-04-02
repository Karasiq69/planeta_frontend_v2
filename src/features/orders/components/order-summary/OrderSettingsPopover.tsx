'use client'

import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useActiveEmployees } from '@/features/employees/api/queries'
import { useEditOrder } from '@/features/orders/api/mutations'
import EmployeeCombobox from '@/features/orders/components/order-summary/EmployeeCombobox'
import { REPAIR_TYPE_OPTIONS } from '@/features/orders/types'

import type { Order } from '@/features/orders/types'

const GUARANTEE_PLACEHOLDER =
  'Гарантия на выполненные работы — 30 дней или 1 000 км пробега (что наступит ранее). Гарантия не распространяется на работы, выполненные с использованием запасных частей заказчика.'

type Props = {
  order: Order
}

export default function OrderSettingsPopover({ order }: Props) {
  const { mutate } = useEditOrder(order.id)
  const { data: employeesData, isLoading: employeesLoading } = useActiveEmployees()
  const employees = employeesData ?? []

  const [guaranteeText, setGuaranteeText] = useState(order.guaranteeText ?? '')

  useEffect(() => {
    setGuaranteeText(order.guaranteeText ?? '')
  }, [order.guaranteeText])

  const handleRepairTypeChange = (value: string) => {
    mutate({ repairType: value } as Partial<Order>)
  }

  const handleDispatcherChange = (id: number | null) => {
    mutate({ dispatcherId: id } as Partial<Order>)
  }

  const handleMasterChange = (id: number | null) => {
    mutate({ masterId: id } as Partial<Order>)
  }

  const handleGuaranteeBlur = () => {
    const newValue = guaranteeText.trim() || null
    if (newValue !== (order.guaranteeText ?? null)) {
      mutate({ guaranteeText: newValue } as Partial<Order>)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 text-muted-foreground"
        >
          <Settings className="size-3.5" />
          <span className="sr-only">Настройки заказа</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-3" align="start">
        <div className="space-y-1.5">
          <Label>Вид ремонта</Label>
          <Select
            value={order.repairType ?? ''}
            onValueChange={handleRepairTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите вид ремонта" />
            </SelectTrigger>
            <SelectContent>
              {REPAIR_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label>Диспетчер</Label>
          <EmployeeCombobox
            employees={employees}
            value={order.dispatcherId}
            onChange={handleDispatcherChange}
            placeholder="Выберите диспетчера"
            isLoading={employeesLoading}
          />
        </div>

        <div className="space-y-2.5">
          <Label>Мастер-приемщик</Label>
          <EmployeeCombobox
            employees={employees}
            value={order.masterId}
            onChange={handleMasterChange}
            placeholder="Выберите мастера"
            isLoading={employeesLoading}
          />
        </div>

        <div className="space-y-2.5">
          <Label>Текст гарантии</Label>
          <Textarea
            value={guaranteeText}
            onChange={(e) => setGuaranteeText(e.target.value)}
            onBlur={handleGuaranteeBlur}
            placeholder={GUARANTEE_PLACEHOLDER}
            rows={4}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
