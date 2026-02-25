import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import LoaderSectionAnimated from '@/components/ui/LoaderSectionAnimated'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataTableSimpleMech from '@/features/mechanics/components/table/DataTableSimpleMech'
import { useOrderServicesById } from '@/features/orders/api/queries'
import CreateOrderServiceButton from '@/features/orders/components/order-tabs/order-services/CreateOrderServiceButton'
import ServicesCombobox from '@/features/orders/components/order-tabs/order-services/ServicesCombobox'
import { orderMechanicsColumnsDefs } from '@/features/orders/components/tables/order-mechanics/columns'
import { ServicesColumnDefs } from '@/features/orders/components/tables/order-services/columns'

import type {
  ExpandedState} from '@tanstack/react-table';

type Props = {}
const ServicesTabContent = (props: Props) => {
  const { id } = useParams()
  const orderId = Number(id)
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const { data: services, isLoading } = useOrderServicesById(orderId)

  const columns = useMemo(() => ServicesColumnDefs, [])
  const mechanicsColumns = useMemo(() => orderMechanicsColumnsDefs, [])

  const table = useReactTable({
    data: services || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    state: {
      expanded,
    },
  })

  if (isLoading) return <LoaderSectionAnimated className="bg-background" text="Загружаем..." />
  return (
    <>
      <Card className="">
        <CardHeader
          className="flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none"
        >
          <ServicesCombobox orderId={orderId} />
          <CreateOrderServiceButton />
        </CardHeader>
        <CardContent className="shadow-inner p-0">
          <ScrollArea className="max-h-[500px]">
          <Table className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r bg-muted/50"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      className="hover:bg-white *:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='py-3'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={row.getAllCells().length} className="bg-muted p-0">
                          <div
                            className="bg-linear-to-t from-gray-50 to-zinc-200 p-3 px-10 shadow-inner"
                          >
                            <DataTableSimpleMech
                              data={row.getValue('mechanics') || []}
                              columns={mechanicsColumns}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    Ничего не найдено.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
export default ServicesTabContent
