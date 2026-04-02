'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ExternalLink, FileText, Wrench, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { getFullModelDisplayName } from '@/features/cars/utils'
import { useOrdersList } from '@/features/orders/api/queries'
import { PAYMENT_STATUS_LABELS, statusOptions } from '@/features/orders/types'
import { formatMoney } from '@/lib/utils'

import type { PaymentStatus } from '@/features/orders/types'
import type { DateRange } from 'react-day-picker'

interface ClientOrdersTabProps {
  clientId: number
}

const formatDate = (date: string) => {
  try {
    return format(parseISO(date), 'dd.MM.yyyy', { locale: ru })
  } catch {
    return date
  }
}

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'COMPLETED':
      return 'secondary'
    case 'IN_PROGRESS':
      return 'default'
    case 'CANCELLED':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getStatusLabel = (status: string) => {
  return statusOptions.find((o) => o.value === status)?.label ?? status
}

const paymentStatusVariant = (status: PaymentStatus | null | undefined): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'PAID':
      return 'secondary'
    case 'PARTIAL':
      return 'outline'
    case 'UNPAID':
      return 'destructive'
    default:
      return 'outline'
  }
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const ClientOrdersTab = ({ clientId }: ClientOrdersTabProps) => {
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const { data, isLoading } = useOrdersList({
    clientId,
    page,
    pageSize: 10,
  })

  const orders = data?.data ?? []
  const pagination = data?.meta

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Заказ-наряды</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Нет заказов</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        {dateRange?.from && (
          <Button variant="ghost" size="icon" onClick={() => setDateRange(undefined)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Заказ-наряды
            {pagination && (
              <span className="text-muted-foreground font-normal ml-2">({pagination.total})</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="multiple" className="w-full">
            {orders.map((order) => (
              <AccordionItem key={order.id} value={String(order.id)} className="border-b-0 mb-2">
                <AccordionTrigger className="hover:no-underline rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/30">
                  <div className="flex items-center gap-3 text-sm w-full mr-3">
                    <span className="font-mono font-semibold text-xs bg-muted rounded px-1.5 py-0.5">
                      #{order.id}
                    </span>
                    <span className="text-muted-foreground">{formatDate(order.createdAt)}</span>
                    <Badge variant={statusVariant(order.status)} className="text-xs">
                      {getStatusLabel(order.status)}
                    </Badge>
                    {order.car && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {order.car.brand?.name} {getFullModelDisplayName(order.car.model)}
                      </span>
                    )}
                    {order.paymentStatus && (
                      <Badge variant={paymentStatusVariant(order.paymentStatus)} className="text-xs ml-auto">
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                      </Badge>
                    )}
                    <span className="font-semibold tabular-nums ml-auto">
                      {formatCurrency(order.totalCost)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-lg border bg-card mx-3 mb-1">
                    {order.reasonToApply && (
                      <div className="px-4 py-2.5 border-b bg-muted/20">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Причина:</span>{' '}
                          {order.reasonToApply}
                        </p>
                      </div>
                    )}

                    {order.services && order.services.length > 0 && (
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Wrench className="size-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Работы
                          </span>
                        </div>
                        <div className="space-y-2">
                          {order.services.map((service) => (
                            <div key={service.id} className="flex items-start justify-between gap-3 text-sm">
                              <div className="min-w-0">
                                <p className="truncate">{service.service?.name ?? `Услуга #${service.serviceId}`}</p>
                                {service.employees && service.employees.length > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    {service.employees.map((e) => e.employee?.firstName ?? '').filter(Boolean).join(', ')}
                                  </p>
                                )}
                              </div>
                              <span className="font-medium tabular-nums shrink-0 text-xs">
                                {formatCurrency(service.appliedPrice)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.recommendation && (
                      <>
                        <Separator />
                        <div className="px-4 py-3">
                          <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 px-3 py-2 text-sm">
                            <span className="text-amber-700 dark:text-amber-400 font-medium text-xs">
                              Рекомендации:
                            </span>{' '}
                            <span className="text-amber-900 dark:text-amber-200">
                              {order.recommendation}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />
                    <div className="px-4 py-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                        <Link href={`/orders/${order.id}`}>
                          Открыть заказ-наряд
                          <ExternalLink className="ml-1.5 size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t mt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Назад
              </Button>
              <span className="text-sm text-muted-foreground">
                Страница {pagination.page} из {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Далее
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientOrdersTab
