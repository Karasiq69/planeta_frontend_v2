import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import DataTableBasic from '@/components/common/table/data-table-basic'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { useOrderProductsByOrderId } from '@/features/order-products/api/queries'
import OrderProductsCombobox from '@/features/order-products/components/OrderProductsCombobox'
import { OrderProductsColumnDefs } from '@/features/orders/components/tables/order-products/columns'

type Props = {}
const ProductsTabContent = (props: Props) => {
  const { id } = useParams()
  const orderId = Number(id)
  const { data, isLoading } = useOrderProductsByOrderId(orderId)
  const columns = useMemo(() => OrderProductsColumnDefs, [])

  const table = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <LoaderSectionAnimated className="bg-background" text="Загружаем..." />
  if (!data) return 'no data'

  return (
    <Card className="">
      <CardHeader
        className="flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none"
      >
        <OrderProductsCombobox orderId={orderId} />
        {/*<CreateOrderServiceButton/>*/}
      </CardHeader>
      <CardContent className=" space-y-3 shadow-inner p-0">
        <DataTableBasic table={table} columns={columns} />
      </CardContent>
    </Card>
  )
}
export default ProductsTabContent
