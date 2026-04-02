'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CreditCard, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePaymentsList } from '@/features/payments/api/queries'
import { formatMoney } from '@/lib/utils'

import type { Payment } from '@/features/payments/types'

interface ClientPaymentsTabProps {
  clientId: number
}

const formatDate = (date: string | null) => {
  if (!date) return '—'
  try {
    return format(parseISO(date), 'dd.MM.yyyy', { locale: ru })
  } catch {
    return '—'
  }
}

const PAYMENT_METHOD_LABELS: Record<Payment['paymentMethod'], string> = {
  cash: 'Наличные',
  card: 'Карта',
  transfer: 'Перевод',
  online: 'Онлайн',
}

const PAYMENT_STATUS_LABELS: Record<Payment['status'], string> = {
  pending: 'Ожидает',
  completed: 'Оплачен',
  cancelled: 'Отменён',
  refunded: 'Возврат',
}

const statusVariant = (status: Payment['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'completed':
      return 'secondary'
    case 'cancelled':
    case 'refunded':
      return 'destructive'
    case 'pending':
      return 'outline'
    default:
      return 'outline'
  }
}

const ClientPaymentsTab = ({ clientId }: ClientPaymentsTabProps) => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = usePaymentsList({
    clientId,
    page,
    pageSize: 10,
  })

  const payments = data?.data ?? []
  const pagination = data?.meta

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CreditCard className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Нет оплат</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
                <TableHead>Метод</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Заказ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="text-sm">
                    {formatDate(payment.paidAt ?? payment.createdAt)}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-sm">
                    {formatMoney(payment.amount)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {PAYMENT_METHOD_LABELS[payment.paymentMethod]}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(payment.status)} className="text-xs">
                      {PAYMENT_STATUS_LABELS[payment.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                      <Link href={`/orders/${payment.orderId}`}>
                        #{payment.orderId}
                        <ExternalLink className="ml-1 size-3" />
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

export default ClientPaymentsTab
