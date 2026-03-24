'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import PageLayout from '@/components/common/PageLayout'
import DataTable from '@/components/common/table/data-table'
import { AppConfirmDialog } from '@/components/ds'
import { AppEmptyState } from '@/components/ds/composite/AppEmptyState'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useDeleteWarehouse } from '@/features/warehouse/api/mutations'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import WarehouseForm from '@/features/warehouse/components/forms/WarehouseForm'
import { WarehouseTypeBadge } from '@/features/warehouse/components/WarehouseTypeBadge'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { Warehouse } from '@/features/warehouse/types'
import type { ColumnDef } from '@tanstack/react-table'

const WarehousesPage = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const [editWarehouse, setEditWarehouse] = useState<Warehouse | null>(null)
  const [deleteWarehouse, setDeleteWarehouse] = useState<Warehouse | null>(null)
  const deleteMutation = useDeleteWarehouse()
  const { data, isLoading } = useGetWarehouses()

  const warehouses = (data ?? []) as Warehouse[]

  const columns = useMemo<ColumnDef<Warehouse>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <div>Название</div>,
        cell: ({ row }) => {
          const typeConfig = warehouseTypeConfig[row.original.type]
          const Icon = typeConfig?.icon
          return (
            <div className='flex items-center gap-2'>
              {Icon && <Icon className='size-4 text-muted-foreground' />}
              <span className='font-medium'>{row.original.name}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'type',
        header: () => <div>Тип</div>,
        cell: ({ row }) => <WarehouseTypeBadge type={row.original.type} />,
      },
      {
        accessorKey: 'description',
        header: () => <div>Описание</div>,
        cell: ({ row }) => (
          <span className='text-muted-foreground'>{row.original.description || '—'}</span>
        ),
      },
      {
        accessorKey: 'isActive',
        header: () => <div>Статус</div>,
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'success' : 'secondary'}>
            {row.original.isActive ? 'Активен' : 'Неактивен'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className='flex gap-1'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => setEditWarehouse(row.original)}
            >
              <Pencil className='size-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-destructive hover:text-destructive'
              onClick={() => setDeleteWarehouse(row.original)}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: warehouses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <PageLayout>
      <PageLayout.Header
        title='Склады'
        showBackButton
        actions={
          <Button size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить склад
          </Button>
        }
      />
      <PageLayout.Content>
        {isLoading ? (
          <LoaderSectionAnimated className='rounded p-10' />
        ) : warehouses.length > 0 ? (
          <DataTable table={table} columns={columns}>
            <DataTable.Table />
          </DataTable>
        ) : (
          <AppEmptyState title='Нет складов' />
        )}
      </PageLayout.Content>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Новый склад</DialogTitle>
          </DialogHeader>
          <WarehouseForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editWarehouse} onOpenChange={(open) => !open && setEditWarehouse(null)}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Редактирование склада</DialogTitle>
          </DialogHeader>
          {editWarehouse && (
            <WarehouseForm
              warehouse={editWarehouse}
              onSuccess={() => setEditWarehouse(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      <AppConfirmDialog
        open={!!deleteWarehouse}
        onOpenChange={(open) => !open && setDeleteWarehouse(null)}
        title='Удалить склад?'
        description={`Склад «${deleteWarehouse?.name ?? ''}» будет удалён. Если на складе есть товары, удаление невозможно.`}
        onConfirm={() => {
          if (!deleteWarehouse) return
          deleteMutation.mutate(deleteWarehouse.id, {
            onSuccess: () => setDeleteWarehouse(null),
          })
        }}
        confirmText='Удалить'
        variant='danger'
        loading={deleteMutation.isPending}
      />
    </PageLayout>
  )
}

export default WarehousesPage
