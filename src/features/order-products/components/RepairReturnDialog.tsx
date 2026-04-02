'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { AppButton } from '@/components/ds/base/AppButton'
import { AppDialog } from '@/components/ds/base/AppDialog'
import { AppInput } from '@/components/ds/base/AppInput'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRepairReturn } from '@/features/order-products/api/mutations'
import { WarehouseDirectionPicker } from '@/features/warehouse/components/WarehouseDirectionPicker'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { WarehouseTypeEnum } from '@/features/warehouse/types'

import type { OrderProduct } from '@/features/order-products/types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: number
  products: OrderProduct[]
}

interface ReturnItem {
  orderProductId: number
  quantity: number
  checked: boolean
}

export function RepairReturnDialog({ open, onOpenChange, orderId, products }: Props) {
  const { data: warehouses = [] } = useGetWarehouses()
  const { mutate: returnItems, isPending } = useRepairReturn(orderId)

  const workshopProducts = useMemo(
    () => products.filter((p) => p.inWorkshopQty > 0),
    [products]
  )

  const defaultFrom = warehouses.find((w) => w.type === WarehouseTypeEnum.WORKSHOP)
  const defaultTo = warehouses.find((w) => w.type === WarehouseTypeEnum.MAIN)

  const [fromWarehouseId, setFromWarehouseId] = useState<string>('')
  const [targetWarehouseId, setTargetWarehouseId] = useState<string>('')
  const [items, setItems] = useState<ReturnItem[]>([])

  useEffect(() => {
    if (open) {
      setFromWarehouseId(defaultFrom ? String(defaultFrom.id) : '')
      setTargetWarehouseId(defaultTo ? String(defaultTo.id) : '')
      setItems(
        workshopProducts.map((p) => ({
          orderProductId: p.id,
          quantity: p.inWorkshopQty,
          checked: false,
        }))
      )
    }
  }, [open, workshopProducts, defaultFrom, defaultTo])

  const updateItem = (orderProductId: number, update: Partial<ReturnItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.orderProductId === orderProductId ? { ...item, ...update } : item
      )
    )
  }

  const selectedItems = items.filter((i) => i.checked)

  const handleSubmit = () => {
    if (!fromWarehouseId || !targetWarehouseId || selectedItems.length === 0) return

    returnItems(
      {
        fromWarehouseId: Number(fromWarehouseId),
        targetWarehouseId: Number(targetWarehouseId),
        items: selectedItems.map(({ orderProductId, quantity }) => ({
          orderProductId,
          quantity,
        })),
      },
      { onSuccess: () => onOpenChange(false) }
    )
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Вернуть товары из ремонта'
      size='lg'
      footer={
        <AppButton
          variant='outline'
          icon={RotateCcw}
          loading={isPending}
          disabled={selectedItems.length === 0 || !fromWarehouseId || !targetWarehouseId}
          onClick={handleSubmit}
        >
          Вернуть
        </AppButton>
      }
    >
      <div className='space-y-4'>
        <WarehouseDirectionPicker
          fromWarehouseId={fromWarehouseId}
          toWarehouseId={targetWarehouseId}
          onFromChange={setFromWarehouseId}
          onToChange={setTargetWarehouseId}
          fromLabel='Цех (источник)'
          toLabel='Склад (получатель)'
          fromFilter={(w) => w.isActive && w.type === WarehouseTypeEnum.WORKSHOP}
          toFilter={(w) => w.isActive && w.type !== WarehouseTypeEnum.WORKSHOP}
        />

        <div className='border rounded-md overflow-hidden'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead className='w-8 px-2'>
                  <Checkbox
                    checked={items.length > 0 && items.every((i) => i.checked)}
                    onCheckedChange={(checked) =>
                      setItems((prev) => prev.map((i) => ({ ...i, checked: !!checked })))
                    }
                  />
                </TableHead>
                <TableHead className='px-2'>Товар</TableHead>
                <TableHead className='px-2 text-center w-20'>В цеху</TableHead>
                <TableHead className='px-2 text-center w-28'>К возврату</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshopProducts.map((product) => {
                const item = items.find((i) => i.orderProductId === product.id)
                if (!item) return null

                return (
                  <TableRow key={product.id}>
                    <TableCell className='px-2 py-2'>
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={(checked) =>
                          updateItem(product.id, { checked: !!checked })
                        }
                      />
                    </TableCell>
                    <TableCell className='px-2 py-2'>
                      <div className='font-medium'>{product.product.name}</div>
                      <div className='text-xs text-muted-foreground'>
                        {product.product.brand.name}
                        {product.product.partNumber && ` · ${product.product.partNumber}`}
                      </div>
                    </TableCell>
                    <TableCell className='px-2 py-2 text-center'>{product.inWorkshopQty}</TableCell>
                    <TableCell className='px-2 py-2'>
                      <AppInput
                        type='number'
                        min={1}
                        max={product.inWorkshopQty}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 1 && val <= product.inWorkshopQty) {
                            updateItem(product.id, { quantity: val })
                          }
                        }}
                        disabled={!item.checked}
                        className='h-8 w-20 text-center'
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppDialog>
  )
}
