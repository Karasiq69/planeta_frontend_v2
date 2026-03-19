'use client'

import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AppEmptyState } from '@/components/ds/composite/AppEmptyState'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import WarehouseForm from '@/features/warehouse/components/forms/WarehouseForm'
import { warehouseTypeConfig } from '@/features/warehouse/types/config'

import type { Warehouse } from '@/features/warehouse/types'

const WarehousesPage = () => {
  const [createOpen, setCreateOpen] = useState(false)
  const [editWarehouse, setEditWarehouse] = useState<Warehouse | null>(null)
  const { data, isLoading } = useGetWarehouses()

  const warehouses = (data ?? []) as Warehouse[]

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Склады'
        showBackButton
        elements={[
          <Button key='add' size='sm' onClick={() => setCreateOpen(true)}>
            <Plus className='mr-1.5 size-4' />
            Добавить склад
          </Button>,
        ]}
      />

      {isLoading ? (
        <LoaderSectionAnimated className='rounded p-10' />
      ) : warehouses.length > 0 ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='w-[60px]' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => {
                const typeConfig = warehouseTypeConfig[warehouse.type]
                const Icon = typeConfig?.icon
                return (
                  <TableRow key={warehouse.id}>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {Icon && <Icon className='size-4 text-muted-foreground' />}
                        <span className='font-medium'>{warehouse.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeConfig?.variant as 'default' ?? 'default'} className='gap-1.5'>
                        {Icon && <Icon className='size-3' />}
                        {typeConfig?.label ?? warehouse.type}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {warehouse.description || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={warehouse.isActive ? 'success' : 'secondary'}>
                        {warehouse.isActive ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => setEditWarehouse(warehouse)}
                      >
                        <Pencil className='size-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card>
          <AppEmptyState title='Нет складов' />
        </Card>
      )}

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
    </div>
  )
}

export default WarehousesPage
