import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Package, RotateCcw, Wrench } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import { AppButton } from '@/components/ds/base/AppButton'
import DataTableBasic from '@/components/common/table/data-table-basic'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useOrderProductsByOrderId } from '@/features/order-products/api/queries'
import OrderProductsCombobox from '@/features/order-products/components/OrderProductsCombobox'
import { RepairReturnDialog } from '@/features/order-products/components/RepairReturnDialog'
import { RepairTransferDialog } from '@/features/order-products/components/RepairTransferDialog'
import { OrderProductsColumnDefs } from '@/features/orders/components/tables/order-products/columns'
import { OrderStatus } from '@/features/orders/types'

import type { OrderStatus as OrderStatusType } from '@/features/orders/types'

interface Props {
  orderStatus?: OrderStatusType
}

const ProductsTabContent = ({ orderStatus }: Props) => {
  const { id } = useParams()
  const orderId = Number(id)
  const { data, isLoading } = useOrderProductsByOrderId(orderId)
  const columns = useMemo(() => OrderProductsColumnDefs, [])

  const [transferOpen, setTransferOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)

  const table = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const canTransfer =
    orderStatus === OrderStatus.ORDER || orderStatus === OrderStatus.IN_PROGRESS

  const hasAvailableToTransfer = data?.some((p) => p.availableToTransfer > 0) ?? false
  const hasInWorkshop = data?.some((p) => p.inWorkshopQty > 0) ?? false

  if (isLoading) return <LoaderSectionAnimated className='bg-background' text='Загружаем...' />
  if (!data) return 'no data'

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center space-y-0 justify-between border-b rounded-lg rounded-b-none p-3'>
          <OrderProductsCombobox orderId={orderId} />
          <div className='flex items-center gap-2'>
            {canTransfer && hasInWorkshop && (
              <AppButton
                size='sm'
                variant='outline'
                icon={RotateCcw}
                onClick={() => setReturnOpen(true)}
              >
                Вернуть товары
              </AppButton>
            )}
            {canTransfer && (
              <AppButton
                size='sm'
                icon={Wrench}
                disabled={!hasAvailableToTransfer}
                onClick={() => setTransferOpen(true)}
              >
                Передать в ремонт
              </AppButton>
            )}
          </div>
        </CardHeader>
        <CardContent className='shadow-inner p-0'>
          <DataTableBasic
            table={table}
            columns={columns}
            className='h-full'
            emptyState={
              <div className='flex flex-col items-center justify-center py-12 text-center'>
                <Package className='h-10 w-10 text-muted-foreground/50 mb-3' />
                <p className='text-sm font-medium text-muted-foreground'>Товары и запчасти ещё не добавлены</p>
                <p className='text-xs text-muted-foreground/70 mt-1'>Добавьте первый товар или запчасть</p>
              </div>
            }
          />
        </CardContent>
      </Card>

      <RepairTransferDialog
        open={transferOpen}
        onOpenChange={setTransferOpen}
        orderId={orderId}
        products={data}
      />
      <RepairReturnDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        orderId={orderId}
        products={data}
      />
    </>
  )
}

export default ProductsTabContent
