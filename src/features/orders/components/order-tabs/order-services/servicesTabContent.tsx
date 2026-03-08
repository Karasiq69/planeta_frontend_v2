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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrderServicesById } from '@/features/orders/api/queries'
import CreateOrderServiceButton from '@/features/orders/components/order-tabs/order-services/CreateOrderServiceButton'
import ServicesCombobox from '@/features/orders/components/order-tabs/order-services/ServicesCombobox'
import { orderMechanicsColumnsDefs } from '@/features/orders/components/tables/order-mechanics/columns'
import { ServicesColumnDefs } from '@/features/orders/components/tables/order-services/columns'

import type { ColumnDef, ExpandedState } from '@tanstack/react-table'

interface SimpleTableProps {
  data: any[]
  columns: ColumnDef<any>[]
}

const SimpleDataTable: React.FC<SimpleTableProps> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className='hover:bg-transparent border-b-0'>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className='p-0 px-3 h-7 text-[11px] font-normal text-muted-foreground'>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className='border-b-0 hover:bg-muted/30'>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='py-1 px-3'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className='hover:bg-transparent'>
            <TableCell colSpan={columns.length} className='h-12 text-center text-xs text-muted-foreground'>
              Нет механиков
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

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

  if (isLoading) return <LoaderSectionAnimated className='bg-background' text='Загружаем...' />
  return (
    <>
      <Card className=''>
        <CardHeader className='flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none'>
          <ServicesCombobox orderId={orderId} />
          <CreateOrderServiceButton />
        </CardHeader>
        <CardContent className='shadow-inner p-0'>
          <div>
            <Table className='table-auto'>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className='*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r bg-muted/50'
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
                        className=' *:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className='py-3'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow className='hover:bg-transparent border-b'>
                          <TableCell colSpan={row.getAllCells().length} className='bg-muted/40 shadow-[inset_0_4px_6px_-2px_rgba(0,0,0,0.06)] p-0 pl-6'>
                            <div className='border-l-2 border-primary/40'>
                              <SimpleDataTable
                                data={row.getValue('employees') || []}
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
          </div>
        </CardContent>
      </Card>
    </>
  )
}
export default ServicesTabContent
