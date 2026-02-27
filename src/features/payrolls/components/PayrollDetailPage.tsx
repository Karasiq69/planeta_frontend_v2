'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Banknote, CheckCircle, ChevronDown, ChevronUp, Play, Trash2, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useConfirmPayroll,
  useDeletePayroll,
  useGeneratePayroll,
  usePayPayroll,
  useRevertPayroll,
} from '@/features/payrolls/api/mutations'
import { usePayroll, usePayrollItems } from '@/features/payrolls/api/queries'
import { PAYROLL_STATUS_LABELS, PAYROLL_STATUS_VARIANT } from '@/features/payrolls/lib/constants'
import { formatPayrollPeriod } from '@/features/payrolls/lib/format'
import { formatRelativeTime } from '@/lib/format-date'
import { formatPrice } from '@/lib/utils'


import { mechanicSummaryColumns } from './mechanic-summary-columns'
import { payrollItemColumns } from './payroll-item-columns'

import type { ColumnDef } from '@tanstack/react-table'

interface Props {
  payrollId: number
}

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className='flex items-baseline gap-2'>
    <span className='text-muted-foreground text-sm shrink-0'>{label}</span>
    <span className='text-sm font-medium'>{value || '—'}</span>
  </div>
)

type ConfirmAction = 'generate' | 'confirm' | 'pay' | 'delete' | 'revert'

function MiniTable<T>({ data, columns }: { data: T[]; columns: ColumnDef<T>[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ScrollArea className='border rounded-md'>
      <Table>
        <TableHeader className='bg-muted border-b'>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-1.5'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-16 text-center text-muted-foreground'
              >
                Нет данных
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

const CONFIRM_CONFIG: Record<
  ConfirmAction,
  { title: string; description: string; action: string }
> = {
  generate: {
    title: 'Сгенерировать начисления?',
    description: 'Начисления будут рассчитаны на основе выполненных услуг за период.',
    action: 'Сгенерировать',
  },
  confirm: {
    title: 'Подтвердить ведомость?',
    description: 'После подтверждения ведомость нельзя будет изменить.',
    action: 'Подтвердить',
  },
  pay: {
    title: 'Отметить как оплаченную?',
    description: 'Ведомость будет отмечена как оплаченная.',
    action: 'Оплатить',
  },
  delete: {
    title: 'Удалить ведомость?',
    description: 'Ведомость будет удалена безвозвратно.',
    action: 'Удалить',
  },
  revert: {
    title: 'Откатить ведомость?',
    description: 'Ведомость вернётся в статус черновика. Можно будет пересчитать или удалить.',
    action: 'Откатить',
  },
}

const PayrollDetailPage = ({ payrollId }: Props) => {
  const router = useRouter()
  const [showItems, setShowItems] = useState(false)
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)

  const { data: payroll, isLoading } = usePayroll(payrollId)
  const { data: itemsData, isLoading: itemsLoading } = usePayrollItems(payrollId, showItems)

  const { mutate: generate, isPending: isGenerating } = useGeneratePayroll(payrollId)
  const { mutate: confirm, isPending: isConfirming } = useConfirmPayroll(payrollId)
  const { mutate: pay, isPending: isPaying } = usePayPayroll(payrollId)
  const { mutate: revert, isPending: isReverting } = useRevertPayroll(payrollId)
  const { mutate: remove, isPending: isDeleting } = useDeletePayroll()

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!payroll) return <div className='p-4'>Ведомость не найдена</div>

  const isBusy = isGenerating || isConfirming || isPaying || isDeleting || isReverting

  const handleConfirmedAction = () => {
    if (!confirmAction) return
    const callbacks = {
      generate: () => generate(undefined, { onSuccess: () => setConfirmAction(null) }),
      confirm: () => confirm(undefined, { onSuccess: () => setConfirmAction(null) }),
      pay: () => pay(undefined, { onSuccess: () => setConfirmAction(null) }),
      revert: () => revert(undefined, { onSuccess: () => setConfirmAction(null) }),
      delete: () => remove(payrollId, { onSuccess: () => router.push('/payrolls') }),
    }
    callbacks[confirmAction]()
  }

  return (
    <section className='flex flex-col h-full gap-4'>
      {/* Header */}
      <div className='flex items-center justify-between gap-4'>
        <PageHeader
          title={`Ведомость #${payroll.id}`}
          showBackButton
          elements={[
            <Badge key='status' variant={PAYROLL_STATUS_VARIANT[payroll.status]}>
              {PAYROLL_STATUS_LABELS[payroll.status]}
            </Badge>,
          ]}
        />
        <div className='flex items-center gap-2 shrink-0'>
          {payroll.status === 'draft' && (
            <>
              <Button
                variant='outline'
                onClick={() => setConfirmAction('generate')}
                disabled={isBusy}
              >
                <Play className='h-4 w-4' />
                Сгенерировать
              </Button>
              <Button onClick={() => setConfirmAction('confirm')} disabled={isBusy}>
                <CheckCircle className='h-4 w-4' />
                Подтвердить
              </Button>
              <Button
                variant='destructive'
                onClick={() => setConfirmAction('delete')}
                disabled={isBusy}
              >
                <Trash2 className='h-4 w-4' />
                Удалить
              </Button>
            </>
          )}
          {payroll.status === 'confirmed' && (
            <>
              <Button
                variant='outline'
                onClick={() => setConfirmAction('revert')}
                disabled={isBusy}
              >
                <Undo2 className='h-4 w-4' />
                Откатить
              </Button>
              <Button onClick={() => setConfirmAction('pay')} disabled={isBusy}>
                <Banknote className='h-4 w-4' />
                Оплатить
              </Button>
            </>
          )}
          {payroll.status === 'paid' && (
            <Button variant='outline' onClick={() => setConfirmAction('revert')} disabled={isBusy}>
              <Undo2 className='h-4 w-4' />
              Откатить
            </Button>
          )}
        </div>
      </div>

      {/* Info card */}
      <Card className='p-4'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3'>
          <Field label='Период:' value={formatPayrollPeriod(payroll.periodStart)} />
          <Field label='Создана:' value={formatRelativeTime(payroll.createdAt)} />
          <Field
            label='Подтверждена:'
            value={payroll.confirmedAt ? formatRelativeTime(payroll.confirmedAt) : null}
          />
          <Field
            label='Оплачена:'
            value={payroll.paidAt ? formatRelativeTime(payroll.paidAt) : null}
          />
          <Field label='Начислений:' value={payroll.totalItems.toString()} />
          <Field label='Сумма:' value={formatPrice(payroll.totalAmount)} />
        </div>
      </Card>

      {/* Mechanic summary */}
      <Card className='p-4'>
        <h4 className='text-sm font-medium mb-3'>Сводка по механикам</h4>
        <MiniTable data={payroll.summary} columns={mechanicSummaryColumns} />
      </Card>

      {/* Detailed items (lazy) */}
      <Card className='p-4 flex-1 min-h-0 flex flex-col'>
        <Button
          variant='ghost'
          className='w-fit mb-3 -ml-2'
          onClick={() => setShowItems((v) => !v)}
        >
          {showItems ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
          {showItems ? 'Скрыть детализацию' : 'Показать детализацию'}
        </Button>
        {showItems && (
          <div className='flex-1 min-h-0'>
            {itemsLoading ? (
              <LoaderSectionAnimated className='rounded p-6' />
            ) : (
              <MiniTable data={itemsData?.data ?? []} columns={payrollItemColumns} />
            )}
          </div>
        )}
      </Card>

      {/* Confirm dialog */}
      <AlertDialog open={confirmAction !== null} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction && CONFIRM_CONFIG[confirmAction].title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction && CONFIRM_CONFIG[confirmAction].description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction disabled={isBusy} onClick={handleConfirmedAction}>
              {confirmAction && CONFIRM_CONFIG[confirmAction].action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

export default PayrollDetailPage
