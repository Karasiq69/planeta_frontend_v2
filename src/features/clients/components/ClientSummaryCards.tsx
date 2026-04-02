'use client'

import { AlertCircle, Car, CreditCard, Hash } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

import type { ClientSummary } from '@/features/clients/types'

interface ClientSummaryCardsProps {
  summary?: ClientSummary
  isLoading: boolean
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const ClientSummaryCards = ({ summary, isLoading }: ClientSummaryCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  const hasDebt = (summary?.totalDebt ?? 0) > 0

  const cards = [
    {
      icon: Hash,
      label: 'Заказов',
      value: summary?.totalOrders ?? 0,
      accent: false,
    },
    {
      icon: Car,
      label: 'Автомобилей',
      value: summary?.totalCars ?? 0,
      accent: false,
    },
    {
      icon: CreditCard,
      label: 'Оплачено',
      value: formatCurrency(summary?.totalPaid ?? 0),
      accent: false,
    },
    {
      icon: AlertCircle,
      label: 'Задолженность',
      value: formatCurrency(summary?.totalDebt ?? 0),
      accent: hasDebt,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center gap-3 py-3 px-4">
            <div
              className={cn(
                'flex items-center justify-center size-9 rounded-md',
                card.accent ? 'bg-destructive/10' : 'bg-muted'
              )}
            >
              <card.icon
                className={cn(
                  'size-4',
                  card.accent ? 'text-destructive' : 'text-muted-foreground'
                )}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p
                className={cn(
                  'text-sm font-semibold',
                  card.accent && 'text-destructive'
                )}
              >
                {card.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ClientSummaryCards
