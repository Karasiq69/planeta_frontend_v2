'use client'

import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Mail } from 'lucide-react'
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
import { useEmailLogs } from '@/features/email/api/queries'

import type { EmailStatus } from '@/features/email/types'

interface EmailLogsTabProps {
  clientId?: number
  orderId?: number
}

const STATUS_LABELS: Record<EmailStatus, string> = {
  pending: 'Ожидает',
  sent: 'Отправлено',
  failed: 'Ошибка',
}

const statusVariant = (status: EmailStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'sent':
      return 'secondary'
    case 'failed':
      return 'destructive'
    case 'pending':
      return 'outline'
    default:
      return 'outline'
  }
}

const formatDate = (date: string | null) => {
  if (!date) return '—'
  try {
    return format(parseISO(date), 'dd.MM.yyyy HH:mm', { locale: ru })
  } catch {
    return '—'
  }
}

export default function EmailLogsTab({ clientId, orderId }: EmailLogsTabProps) {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useEmailLogs({
    page,
    pageSize: 20,
    clientId,
    orderId,
  })

  const logs = data?.data ?? []
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

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Mail className="size-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Нет отправленных писем</p>
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
                <TableHead>Тема</TableHead>
                <TableHead>Получатель</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(log.sentAt ?? log.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm max-w-[300px] truncate">{log.subject}</TableCell>
                  <TableCell className="text-sm">{log.recipientEmail}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(log.status)} className="text-xs">
                      {STATUS_LABELS[log.status]}
                    </Badge>
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
