'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ExternalLink, FileText, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrdersList } from '@/features/orders/api/queries'
import { PAYMENT_STATUS_LABELS, statusOptions } from '@/features/orders/types'
import { getFullModelDisplayName } from '@/features/cars/utils'
import { formatMoney } from '@/lib/utils'

import type { Order, PaymentStatus } from '@/features/orders/types'
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
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
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
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Номер</TableHead>
                <TableHead>Автомобиль</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
                <TableHead>Оплата</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-semibold text-xs">
                    #{order.id}
                  </TableCell>
                  <TableCell>
                    {order.car ? (
                      <Link
                        href={`/cars/${order.car.id}`}
                        className="text-sm hover:underline"
                      >
                        {order.car.brand?.name} {getFullModelDisplayName(order.car.model)}
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(order.status)} className="text-xs">
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-sm">
                    {formatMoney(order.totalCost)}
                  </TableCell>
                  <TableCell>
                    {order.paymentStatus && (
                      <Badge variant={paymentStatusVariant(order.paymentStatus)} className="text-xs">
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-8" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
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
    </div>
  )
}

export default ClientOrdersTab
