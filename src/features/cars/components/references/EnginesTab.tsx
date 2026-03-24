'use client'

import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
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
import { DeleteConfirmAlert } from '@/components/common/DeleteConfirmAlert'
import { EngineForm } from '@/features/cars/components/references/EngineForm'
import { ENGINE_TYPE_LABELS } from '@/features/cars/utils'
import { useDebounce } from '@/hooks/use-debounce'

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  const debouncedSearch = useDebounce(search, 300)
  const filterBrandId = brandFilter === 'all' ? undefined : Number(brandFilter)

  const { data: brands = [] } = useVehiclesBrands()
  const { data: enginesData } = useCarEngines({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    searchTerm: debouncedSearch || undefined,
    brandId: filterBrandId,
  })
  const deleteMutation = useDeleteEngine()

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
    data: enginesData?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: enginesData?.meta.totalPages ?? -1,
    manualPagination: true,
    state: { pagination },
  })

  const handleBrandChange = (value: string) => {
    setBrandFilter(value)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

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
              onChange={handleSearchChange}
              className='h-8 max-w-[200px]'
            />
            <Select value={brandFilter} onValueChange={handleBrandChange}>
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
        <DataTable.Pagination totalCount={enginesData?.meta.total} />
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

      <DeleteConfirmAlert
        open={!!deleteEngine}
        onOpenChange={(open) => !open && setDeleteEngine(null)}
        name={deleteEngine?.name ?? ''}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
