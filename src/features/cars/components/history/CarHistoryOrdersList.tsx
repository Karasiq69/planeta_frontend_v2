'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CreditCard, ExternalLink, FileText, Package, Wrench } from 'lucide-react'
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import type { CarHistoryOrder } from '@/features/cars/types'

interface CarHistoryOrdersListProps {
  orders: CarHistoryOrder[]
  pagination?: { page: number; pageSize: number; total: number; totalPages: number }
  isLoading: boolean
  page: number
  onPageChange: (page: number) => void
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const formatDate = (date: string) => {
  try {
    return format(parseISO(date), 'dd.MM.yyyy', { locale: ru })
  } catch {
    return date
  }
}

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'завершён':
      return 'secondary'
    case 'in_progress':
    case 'в работе':
      return 'default'
    case 'cancelled':
    case 'отменён':
      return 'destructive'
    default:
      return 'outline'
  }
}

const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    completed: 'Завершён',
    in_progress: 'В работе',
    cancelled: 'Отменён',
    pending: 'Ожидает',
    draft: 'Черновик',
  }
  return map[status] ?? status
}

const paymentMethodLabel = (method: string) => {
  const map: Record<string, string> = {
    cash: 'Наличные',
    card: 'Карта',
    transfer: 'Перевод',
  }
  return map[method] ?? method
}

const paymentStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    paid: 'оплачено',
    pending: 'ожидает',
    refunded: 'возврат',
  }
  return map[status] ?? status
}

const SectionHeader = ({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <div className="flex items-center gap-1.5 mb-2">
    <Icon className="size-3.5 text-muted-foreground" />
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
  </div>
)

const CarHistoryOrdersList = ({
  orders,
  pagination,
  isLoading,
  page,
  onPageChange,
}: CarHistoryOrdersListProps) => {
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
          <p className="text-sm text-muted-foreground">Нет записей об обслуживании</p>
        </CardContent>
      </Card>
    )
  }

  return (
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
                    {statusLabel(order.status)}
                  </Badge>
                  {order.mileage != null && (
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {order.mileage.toLocaleString('ru-RU')} км
                    </span>
                  )}
                  <span className="ml-auto font-semibold tabular-nums">
                    {order.totalCost != null ? formatCurrency(order.totalCost) : '—'}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                    {/* Услуги */}
                    <div className="px-4 py-3">
                      <SectionHeader icon={Wrench} label="Услуги" />
                      {order.services.length > 0 ? (
                        <div className="space-y-2">
                          {order.services.map((service) => (
                            <div key={service.id} className="flex items-start justify-between gap-3 text-sm">
                              <div className="min-w-0">
                                <p className="truncate">{service.name}</p>
                                {service.mechanics.length > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    {service.mechanics.map((m) => m.name).join(', ')}
                                  </p>
                                )}
                              </div>
                              <span className="font-medium tabular-nums shrink-0 text-xs">
                                {formatCurrency(service.appliedPrice)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">—</p>
                      )}
                    </div>

                    {/* Запчасти */}
                    <div className="px-4 py-3">
                      <SectionHeader icon={Package} label="Запчасти" />
                      {order.products.length > 0 ? (
                        <div className="space-y-2">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-start justify-between gap-3 text-sm">
                              <span className="min-w-0 truncate">
                                {product.name}
                                {product.quantity > 1 && (
                                  <span className="text-muted-foreground"> x{product.quantity}</span>
                                )}
                              </span>
                              <span className="font-medium tabular-nums shrink-0 text-xs">
                                {formatCurrency(product.actualPrice ?? product.estimatedPrice)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">—</p>
                      )}
                    </div>
                  </div>

                  {/* Оплата + рекомендации */}
                  {(order.payments.length > 0 || order.recommendation) && (
                    <>
                      <Separator />
                      <div className="px-4 py-3 space-y-3">
                        {order.payments.length > 0 && (
                          <div>
                            <SectionHeader icon={CreditCard} label="Оплата" />
                            <div className="flex flex-wrap gap-3">
                              {order.payments.map((payment, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-sm">
                                  <span className="text-muted-foreground">
                                    {paymentMethodLabel(payment.paymentMethod)}
                                  </span>
                                  <span className="font-medium tabular-nums">
                                    {formatCurrency(payment.amount)}
                                  </span>
                                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                                    {paymentStatusLabel(payment.status)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {order.recommendation && (
                          <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 px-3 py-2 text-sm">
                            <span className="text-amber-700 dark:text-amber-400 font-medium text-xs">
                              Рекомендации:
                            </span>{' '}
                            <span className="text-amber-900 dark:text-amber-200">
                              {order.recommendation}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Кнопка перехода */}
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
              onClick={() => onPageChange(page - 1)}
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
              onClick={() => onPageChange(page + 1)}
            >
              Далее
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CarHistoryOrdersList
