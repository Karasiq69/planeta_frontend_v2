'use client'

import { NotepadText, Package, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { AppSheet } from '@/components/ds/base/AppSheet'
import { ComboboxSearch } from '@/components/ComboboxSearch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProductsList } from '@/features/products/api/queries'
import {
  useAddSpecProduct,
  useAddSpecService,
  useDeleteSpecProduct,
  useDeleteSpecService,
} from '@/features/service-specifications/api/mutations'
import { useSpecificationById } from '@/features/service-specifications/api/queries'
import { useAllServices } from '@/features/services/api/queries'
import useDebouncedSearch from '@/hooks/use-debounced-search'

import type { SpecificationServiceItem, SpecificationProductItem } from '../types'
import type { Product } from '@/features/products/types'
import type { IService } from '@/features/services/types'

interface Props {
  specId: number | null
  onOpenChange: (open: boolean) => void
}

// --- Services Tab ---

interface PendingService {
  service: IService
  duration: number
}

const ServicesTab = ({ specId }: { specId: number }) => {
  const { data: spec } = useSpecificationById(specId)
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const {
    data: services,
    isLoading,
    isFetching,
  } = useAllServices({ page: 1, pageSize: 30, searchTerm })
  const { mutate: addService, isPending: isAdding } = useAddSpecService(specId)
  const { mutate: deleteService } = useDeleteSpecService(specId)
  const [pending, setPending] = useState<PendingService | null>(null)

  const handleSelect = (service: IService) => {
    setPending({ service, duration: service.defaultDuration })
  }

  const handleAdd = () => {
    if (!pending) return
    addService(
      {
        serviceId: pending.service.id,
        defaultDuration: pending.duration,
        discountPercent: undefined,
      },
      { onSuccess: () => setPending(null) },
    )
  }

  const items = spec?.services ?? []

  return (
    <div className='flex flex-col gap-4 min-w-0'>
      {/* Add zone */}
      <div className='space-y-2 min-w-0'>
        <ComboboxSearch<IService>
          data={services}
          isLoading={isLoading || isFetching}
          isPending={isAdding}
          onSearch={debouncedHandleSearch}
          onSelect={handleSelect}
          getDisplayValue={(s) => s.name}
          renderItem={(s) => (
            <div className='flex items-center justify-between w-full gap-3'>
              <span className='truncate'>{s.name}</span>
              <span className='text-xs text-muted-foreground shrink-0'>
                {s.defaultDuration} мин
              </span>
            </div>
          )}
          searchError={searchError}
          placeholder='Найти и добавить услугу...'
          width='w-full'
          mode='action'
        />

        {pending && (
          <div className='flex items-center gap-2 rounded-lg border bg-muted/50 p-2.5 min-w-0'>
            <span className='text-sm truncate flex-1 min-w-0 font-medium'>{pending.service.name}</span>
            <Input
              type='number'
              min={1}
              className='h-8 w-20 text-sm'
              value={pending.duration}
              onChange={(e) => setPending({ ...pending, duration: Number(e.target.value) })}
            />
            <span className='text-xs text-muted-foreground shrink-0'>мин</span>
            <Button size='sm' className='h-8' onClick={handleAdd} disabled={isAdding}>
              {isAdding ? '...' : 'Добавить'}
            </Button>
            <Button
              size='sm'
              variant='ghost'
              className='h-8 px-2'
              onClick={() => setPending(null)}
            >
              ✕
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Items list */}
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-2'>
          {items.length > 0
            ? `Добавлено: ${items.length}`
            : 'Найдите услугу через поиск выше'}
        </p>
        <ItemsList
          items={items}
          renderItem={(item: SpecificationServiceItem) => (
            <>
              <span className='truncate flex-1 text-sm'>{item.service.name}</span>
              <Badge variant='secondary' className='text-[10px] px-1.5 py-0 shrink-0 font-normal'>
                {item.defaultDuration} мин
              </Badge>
              {item.discountPercent != null && Number(item.discountPercent) > 0 && (
                <Badge
                  variant='outline'
                  className='text-[10px] px-1.5 py-0 shrink-0 font-normal'
                >
                  −{item.discountPercent}%
                </Badge>
              )}
            </>
          )}
          onDelete={(item: SpecificationServiceItem) => deleteService(item.id)}
        />
      </div>
    </div>
  )
}

// --- Products Tab ---

interface PendingProduct {
  product: Product
  quantity: number
}

const ProductsTab = ({ specId }: { specId: number }) => {
  const { data: spec } = useSpecificationById(specId)
  const { searchTerm, searchError, debouncedHandleSearch } = useDebouncedSearch()
  const {
    data: products,
    isLoading,
    isFetching,
  } = useProductsList({ page: 1, pageSize: 30, searchTerm })
  const { mutate: addProduct, isPending: isAdding } = useAddSpecProduct(specId)
  const { mutate: deleteProduct } = useDeleteSpecProduct(specId)
  const [pending, setPending] = useState<PendingProduct | null>(null)

  const handleSelect = (product: Product) => {
    setPending({ product, quantity: 1 })
  }

  const handleAdd = () => {
    if (!pending) return
    addProduct(
      { productId: pending.product.id, quantity: pending.quantity },
      { onSuccess: () => setPending(null) },
    )
  }

  const items = spec?.products ?? []

  return (
    <div className='flex flex-col gap-4 min-w-0'>
      {/* Add zone */}
      <div className='space-y-2 min-w-0'>
        <ComboboxSearch<Product>
          data={products}
          isLoading={isLoading || isFetching}
          isPending={isAdding}
          onSearch={debouncedHandleSearch}
          onSelect={handleSelect}
          getDisplayValue={(p) => p.name}
          renderItem={(p) => (
            <div className='flex items-center justify-between w-full gap-3'>
              <span className='truncate'>{p.name}</span>
              <span className='text-xs text-muted-foreground shrink-0'>{p.partNumber}</span>
            </div>
          )}
          searchError={searchError}
          placeholder='Найти и добавить товар...'
          width='w-full'
          mode='action'
        />

        {pending && (
          <div className='flex items-center gap-2 rounded-lg border bg-muted/50 p-2.5 min-w-0'>
            <span className='text-sm truncate flex-1 min-w-0 font-medium'>{pending.product.name}</span>
            <Input
              type='number'
              min={0.01}
              step={0.01}
              className='h-8 w-20 text-sm'
              value={pending.quantity}
              onChange={(e) => setPending({ ...pending, quantity: Number(e.target.value) })}
            />
            <span className='text-xs text-muted-foreground shrink-0'>шт</span>
            <Button size='sm' className='h-8' onClick={handleAdd} disabled={isAdding}>
              {isAdding ? '...' : 'Добавить'}
            </Button>
            <Button
              size='sm'
              variant='ghost'
              className='h-8 px-2'
              onClick={() => setPending(null)}
            >
              ✕
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Items list */}
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-2'>
          {items.length > 0
            ? `Добавлено: ${items.length}`
            : 'Найдите товар через поиск выше'}
        </p>
        <ItemsList
          items={items}
          renderItem={(item: SpecificationProductItem) => (
            <>
              <span className='truncate flex-1 text-sm'>{item.product.name}</span>
              <Badge variant='secondary' className='text-[10px] px-1.5 py-0 shrink-0 font-normal'>
                ×{item.quantity} {item.product.unit}
              </Badge>
              {item.discountPercent != null && Number(item.discountPercent) > 0 && (
                <Badge
                  variant='outline'
                  className='text-[10px] px-1.5 py-0 shrink-0 font-normal'
                >
                  −{item.discountPercent}%
                </Badge>
              )}
            </>
          )}
          onDelete={(item: SpecificationProductItem) => deleteProduct(item.id)}
        />
      </div>
    </div>
  )
}

// --- Generic items list ---

function ItemsList<T extends { id: number }>({
  items,
  renderItem,
  onDelete,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  onDelete: (item: T) => void
}) {
  if (items.length === 0) return null

  return (
    <div className='space-y-0.5'>
      {items.map((item) => (
        <div
          key={item.id}
          className='flex items-center gap-2 group rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors min-w-0'
        >
          {renderItem(item)}
          <Button
            variant='ghost'
            size='icon'
            className='size-6 shrink-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive transition-opacity'
            onClick={() => onDelete(item)}
          >
            <Trash2 className='size-3' />
          </Button>
        </div>
      ))}
    </div>
  )
}

// --- Main Sheet ---

const SpecificationPositionsSheet = ({ specId, onOpenChange }: Props) => {
  const { data: spec, isLoading } = useSpecificationById(specId ?? 0)

  const serviceCount = spec?.services.length ?? 0
  const productCount = spec?.products.length ?? 0

  return (
    <AppSheet
      open={!!specId}
      onOpenChange={(open) => !open && onOpenChange(false)}
      title={spec?.name ?? 'Спецификация'}
      description={
        spec && (
          <span className='flex items-center gap-2 pt-1'>
            <Badge variant={spec.isActive ? 'default' : 'secondary'} className='text-[10px]'>
              {spec.isActive ? 'Активна' : 'Неактивна'}
            </Badge>
            <span className='text-xs text-muted-foreground'>
              {serviceCount} {serviceCount === 1 ? 'услуга' : 'услуг'} · {productCount}{' '}
              {productCount === 1 ? 'товар' : 'товаров'}
            </span>
          </span>
        )
      }
      size='3xl'
    >
      {isLoading ? (
        <LoaderSectionAnimated className='flex-1 rounded p-10' />
      ) : specId ? (
        <Tabs defaultValue='services'>
          <TabsList className='w-full'>
            <TabsTrigger value='services' className='flex-1 gap-1.5'>
              <NotepadText className='size-3.5' />
              Услуги
              {serviceCount > 0 && (
                <span className='ml-0.5 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold tabular-nums text-primary min-w-[1.25rem] h-4'>
                  {serviceCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value='products' className='flex-1 gap-1.5'>
              <Package className='size-3.5' />
              Товары
              {productCount > 0 && (
                <span className='ml-0.5 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold tabular-nums text-primary min-w-[1.25rem] h-4'>
                  {productCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='services' className='mt-4'>
            <ServicesTab specId={specId} />
          </TabsContent>
          <TabsContent value='products' className='mt-4'>
            <ProductsTab specId={specId} />
          </TabsContent>
        </Tabs>
      ) : null}
    </AppSheet>
  )
}

export default SpecificationPositionsSheet
