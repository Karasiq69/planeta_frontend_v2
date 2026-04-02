'use client'

import { Wrench } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { AppButton } from '@/components/ds/base/AppButton'
import { AppDialog } from '@/components/ds/base/AppDialog'
import { AppInput } from '@/components/ds/base/AppInput'
import { AppSelect } from '@/components/ds/base/AppSelect'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRepairTransfer } from '@/features/order-products/api/mutations'
import { useGetWarehouses } from '@/features/warehouse/api/queries'
import { WarehouseTypeEnum } from '@/features/warehouse/types'

import type { OrderProduct } from '@/features/order-products/types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: number
  products: OrderProduct[]
}

interface TransferItem {
  orderProductId: number
  quantity: number
  checked: boolean
}

export function RepairTransferDialog({ open, onOpenChange, orderId, products }: Props) {
  const { data: warehouses = [] } = useGetWarehouses()
  const { mutate: transfer, isPending } = useRepairTransfer(orderId)

  const availableProducts = useMemo(
    () => products.filter((p) => p.availableToTransfer > 0),
    [products]
  )

  const defaultFrom = warehouses.find((w) => w.type === WarehouseTypeEnum.MAIN)
  const defaultTo = warehouses.find((w) => w.type === WarehouseTypeEnum.WORKSHOP)

  const [fromWarehouseId, setFromWarehouseId] = useState<string>('')
  const [targetWarehouseId, setTargetWarehouseId] = useState<string>('')
  const [items, setItems] = useState<TransferItem[]>([])

  // Sync defaults when warehouses load or dialog opens
  useEffect(() => {
    if (open) {
      setFromWarehouseId(defaultFrom ? String(defaultFrom.id) : '')
      setTargetWarehouseId(defaultTo ? String(defaultTo.id) : '')
      setItems(
        availableProducts.map((p) => ({
          orderProductId: p.id,
          quantity: p.availableToTransfer,
          checked: true,
        }))
      )
    }
  }, [open, availableProducts, defaultFrom, defaultTo])

  const warehouseOptions = warehouses.map((w) => ({
    value: String(w.id),
    label: w.name,
  }))

  const updateItem = (orderProductId: number, update: Partial<TransferItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.orderProductId === orderProductId ? { ...item, ...update } : item
      )
    )
  }

  const selectedItems = items.filter((i) => i.checked)

  const handleSubmit = () => {
    if (!fromWarehouseId || !targetWarehouseId || selectedItems.length === 0) return

    transfer(
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
      title='Передать в ремонт'
      size='lg'
      footer={
        <AppButton
          icon={Wrench}
          loading={isPending}
          disabled={selectedItems.length === 0 || !fromWarehouseId || !targetWarehouseId}
          onClick={handleSubmit}
        >
          Передать
        </AppButton>
      }
    >
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-1.5'>
            <Label className='text-sm'>Склад-источник</Label>
            <AppSelect
              options={warehouseOptions}
              value={fromWarehouseId}
              onChange={setFromWarehouseId}
              placeholder='Выберите склад'
            />
          </div>
          <div className='space-y-1.5'>
            <Label className='text-sm'>Цех (получатель)</Label>
            <AppSelect
              options={warehouseOptions}
              value={targetWarehouseId}
              onChange={setTargetWarehouseId}
              placeholder='Выберите цех'
            />
          </div>
        </div>

        <div className='border rounded-md overflow-hidden'>
          <table className='w-full text-sm'>
            <thead className='bg-muted/50'>
              <tr>
                <th className='p-2 w-8'>
                  <Checkbox
                    checked={items.length > 0 && items.every((i) => i.checked)}
                    onCheckedChange={(checked) =>
                      setItems((prev) => prev.map((i) => ({ ...i, checked: !!checked })))
                    }
                  />
                </th>
                <th className='p-2 text-left font-medium'>Товар</th>
                <th className='p-2 text-center font-medium w-20'>В заказе</th>
                <th className='p-2 text-center font-medium w-24'>Доступно</th>
                <th className='p-2 text-center font-medium w-28'>К передаче</th>
              </tr>
            </thead>
            <tbody>
              {availableProducts.map((product) => {
                const item = items.find((i) => i.orderProductId === product.id)
                if (!item) return null

                return (
                  <tr key={product.id} className='border-t'>
                    <td className='p-2'>
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={(checked) =>
                          updateItem(product.id, { checked: !!checked })
                        }
                      />
                    </td>
                    <td className='p-2'>
                      <div className='font-medium'>{product.product.name}</div>
                      <div className='text-xs text-muted-foreground'>
                        {product.product.brand.name}
                        {product.product.partNumber && ` · ${product.product.partNumber}`}
                      </div>
                    </td>
                    <td className='p-2 text-center'>{Number(product.quantity)}</td>
                    <td className='p-2 text-center'>{product.availableToTransfer}</td>
                    <td className='p-2'>
                      <AppInput
                        type='number'
                        min={1}
                        max={product.availableToTransfer}
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 1 && val <= product.availableToTransfer) {
                            updateItem(product.id, { quantity: val })
                          }
                        }}
                        disabled={!item.checked}
                        className='h-8 w-20 text-center'
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppDialog>
  )
}
