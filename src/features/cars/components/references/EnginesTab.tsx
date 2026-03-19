'use client'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import DataTable from '@/components/common/table/data-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDeleteEngine } from '@/features/cars/api/mutations'
import { useCarEngines, useVehiclesBrands } from '@/features/cars/api/queries'
import { DeleteReferenceAlert } from '@/features/cars/components/references/DeleteReferenceAlert'
import { EngineForm } from '@/features/cars/components/references/EngineForm'
import { ENGINE_TYPE_LABELS } from '@/features/cars/utils'

import type { ColumnDef } from '@tanstack/react-table'
import type { ICarBrand, IEngine } from '@/features/cars/types'

function getColumns(brands: ICarBrand[]): ColumnDef<IEngine>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'series',
      header: 'Серия',
      cell: ({ row }) => row.original.series || '—',
    },
    {
      accessorKey: 'engineType',
      header: 'Тип',
      cell: ({ row }) => ENGINE_TYPE_LABELS[row.original.engineType] || '—',
    },
    {
      accessorKey: 'displacement',
      header: 'Объём',
      cell: ({ row }) =>
        row.original.displacement ? `${row.original.displacement} см³` : '—',
    },
    {
      accessorKey: 'power',
      header: 'Мощность',
      cell: ({ row }) =>
        row.original.power ? `${row.original.power} л.с.` : '—',
    },
    {
      accessorKey: 'brandId',
      header: 'Бренд',
      cell: ({ row }) => {
        const brand = brands.find((b) => b.id === row.original.brandId)
        return brand?.name || '—'
      },
    },
  ]
}

export function EnginesTab() {
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editEngine, setEditEngine] = useState<IEngine | null>(null)
  const [deleteEngine, setDeleteEngine] = useState<IEngine | null>(null)

  const { data: brands = [] } = useVehiclesBrands()
  const filterBrandId = brandFilter === 'all' ? undefined : Number(brandFilter)
  const { data: engines = [] } = useCarEngines(filterBrandId)
  const deleteMutation = useDeleteEngine()

  const filteredEngines = useMemo(() => {
    if (!search) return engines
    const term = search.toLowerCase()
    return engines.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        e.series?.toLowerCase().includes(term),
    )
  }, [engines, search])

  const columns = useMemo((): ColumnDef<IEngine>[] => {
    const base = getColumns(brands)
    return [
      ...base,
      {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }) => {
          const engine = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='size-8'>
                  <MoreHorizontal className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setEditEngine(engine)}>
                  <Pencil className='mr-2 size-4' />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-destructive focus:text-destructive'
                  onClick={() => setDeleteEngine(engine)}
                >
                  <Trash2 className='mr-2 size-4' />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [brands])

  const table = useReactTable({
    data: filteredEngines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleDelete = () => {
    if (!deleteEngine) return
    deleteMutation.mutate(deleteEngine.id, {
      onSuccess: () => setDeleteEngine(null),
    })
  }

  return (
    <>
      <DataTable table={table} columns={columns} variant='compact'>
        <DataTable.Toolbar>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Поиск...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='h-8 max-w-[200px]'
            />
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className='h-8 w-[180px]'>
                <SelectValue placeholder='Все бренды' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Все бренды</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={String(brand.id)}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size='sm' onClick={() => setDialogOpen(true)}>
              <Plus className='mr-1.5 size-4' />
              Добавить
            </Button>
          </div>
        </DataTable.Toolbar>
        <DataTable.Table />
      </DataTable>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Новый двигатель</DialogTitle>
          </DialogHeader>
          <EngineForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editEngine}
        onOpenChange={(open) => !open && setEditEngine(null)}
      >
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование двигателя</DialogTitle>
          </DialogHeader>
          {editEngine && (
            <EngineForm
              initialData={editEngine}
              onSuccess={() => setEditEngine(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteReferenceAlert
        open={!!deleteEngine}
        onOpenChange={(open) => !open && setDeleteEngine(null)}
        name={deleteEngine?.name ?? ''}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
