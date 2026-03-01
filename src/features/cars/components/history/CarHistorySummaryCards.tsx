'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarCheck, CalendarClock, CreditCard, Hash } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import type { CarHistorySummary } from '@/features/cars/types'

interface CarHistorySummaryCardsProps {
  summary?: CarHistorySummary
  isLoading: boolean
}

const formatDate = (date: string | null) => {
  if (!date) return '—'
  try {
    return format(parseISO(date), 'dd.MM.yyyy', { locale: ru })
  } catch {
    return '—'
  }
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const CarHistorySummaryCards = ({ summary, isLoading }: CarHistorySummaryCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    )
  }

  const cards = [
    {
      icon: Hash,
      label: 'Визитов',
      value: summary?.totalOrders ?? 0,
    },
    {
      icon: CreditCard,
      label: 'Потрачено',
      value: formatCurrency(summary?.totalSpent ?? 0),
    },
    {
      icon: CalendarClock,
      label: 'Первый визит',
      value: formatDate(summary?.firstVisit ?? null),
    },
    {
      icon: CalendarCheck,
      label: 'Последний визит',
      value: formatDate(summary?.lastVisit ?? null),
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center gap-3 py-3 px-4">
            <div className="flex items-center justify-center size-9 rounded-md bg-muted">
              <card.icon className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-sm font-semibold">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CarHistorySummaryCards
