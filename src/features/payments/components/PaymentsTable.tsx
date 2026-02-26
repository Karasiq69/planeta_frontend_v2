'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

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
import DataTable from '@/components/common/table/data-table'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useCancelPayment } from '@/features/payments/api/mutations'
import { usePaymentsList } from '@/features/payments/api/queries'
import { createPaymentColumns } from './columns'

import type { PaymentsQueryParams } from '@/features/payments/types'

interface PaymentsTableProps {
  filters: PaymentsQueryParams
}

const PaymentsTable = ({ filters }: PaymentsTableProps) => {
  const [cancelId, setCancelId] = useState<number | null>(null)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const params: PaymentsQueryParams = {
    ...filters,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  }

  const { data, isLoading } = usePaymentsList(params)
  const { mutate: cancel, isPending: isCancelling } = useCancelPayment(0)

  const columns = useMemo(() => createPaymentColumns((id) => setCancelId(id)), [])

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data?.meta.totalPages ?? -1,
    manualPagination: true,
    state: { pagination },
  })

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!data) return <div className='p-4'>Данные недоступны</div>

  return (
    <>
      <DataTable columns={columns} table={table} totalCount={data.meta.total} />

      <AlertDialog open={cancelId !== null} onOpenChange={() => setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Отменить платёж?</AlertDialogTitle>
            <AlertDialogDescription>
              Платёж будет отменён. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Нет</AlertDialogCancel>
            <AlertDialogAction
              disabled={isCancelling}
              onClick={() => {
                if (cancelId) {
                  cancel(cancelId, { onSuccess: () => setCancelId(null) })
                }
              }}
            >
              Отменить платёж
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default PaymentsTable
