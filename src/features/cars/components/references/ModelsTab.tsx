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
import { useDeleteModel } from '@/features/cars/api/mutations'
import { useVehiclesBrands, useVehiclesModels } from '@/features/cars/api/queries'
import { DeleteReferenceAlert } from '@/features/cars/components/references/DeleteReferenceAlert'
import { ModelForm } from '@/features/cars/components/references/ModelForm'

import type { ColumnDef } from '@tanstack/react-table'
import type { ICarBrand, ICarModel } from '@/features/cars/types'

function getColumns(brands: ICarBrand[]): ColumnDef<ICarModel>[] {
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
      accessorKey: 'code',
      header: 'Код',
      cell: ({ row }) => row.original.code || '—',
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

export function ModelsTab() {
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editModel, setEditModel] = useState<ICarModel | null>(null)
  const [deleteModel, setDeleteModel] = useState<ICarModel | null>(null)

  const { data: brands = [] } = useVehiclesBrands()
  const filterBrandId = brandFilter === 'all' ? undefined : Number(brandFilter)
  const { data: models = [] } = useVehiclesModels(filterBrandId)
  const deleteMutation = useDeleteModel()

  const filteredModels = useMemo(() => {
    if (!search) return models
    const term = search.toLowerCase()
    return models.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.series?.toLowerCase().includes(term) ||
        m.code?.toLowerCase().includes(term),
    )
  }, [models, search])

  const columns = useMemo((): ColumnDef<ICarModel>[] => {
    const base = getColumns(brands)
    return [
      ...base,
      {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }) => {
          const model = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='size-8'>
                  <MoreHorizontal className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setEditModel(model)}>
                  <Pencil className='mr-2 size-4' />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-destructive focus:text-destructive'
                  onClick={() => setDeleteModel(model)}
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
    data: filteredModels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleDelete = () => {
    if (!deleteModel) return
    deleteMutation.mutate(deleteModel.id, {
      onSuccess: () => setDeleteModel(null),
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
            <DialogTitle>Новая модель</DialogTitle>
          </DialogHeader>
          <ModelForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editModel}
        onOpenChange={(open) => !open && setEditModel(null)}
      >
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Редактирование модели</DialogTitle>
          </DialogHeader>
          {editModel && (
            <ModelForm
              initialData={editModel}
              onSuccess={() => setEditModel(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteReferenceAlert
        open={!!deleteModel}
        onOpenChange={(open) => !open && setDeleteModel(null)}
        name={deleteModel?.name ?? ''}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
