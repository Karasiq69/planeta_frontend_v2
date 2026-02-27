'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
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
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useDeletePayroll } from '@/features/payrolls/api/mutations'
import { usePayrollsList } from '@/features/payrolls/api/queries'

import { createPayrollColumns } from './columns'

import type { PayrollQuery } from '@/features/payrolls/types'


interface PayrollsTableProps {
  filters: PayrollQuery
}

const PayrollsTable = ({ filters }: PayrollsTableProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = usePayrollsList(filters)
  const { mutate: remove, isPending: isDeleting } = useDeletePayroll()

  const columns = useMemo(() => createPayrollColumns((id) => setDeleteId(id)), [])

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) return <LoaderSectionAnimated className='rounded p-10' />
  if (!data) return <div className='p-4'>Данные недоступны</div>

  return (
    <>
      <DataTable columns={columns} table={table} />

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить ведомость?</AlertDialogTitle>
            <AlertDialogDescription>Ведомость будет удалена безвозвратно.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={() => {
                if (deleteId) {
                  remove(deleteId, { onSuccess: () => setDeleteId(null) })
                }
              }}
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default PayrollsTable
