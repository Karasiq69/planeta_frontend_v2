import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {useOrderServicesById} from "@/features/orders/api/queries";
import {ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable} from "@tanstack/react-table";
import {ServicesColumnDefs} from "@/features/orders/components/tables/order-services/columns";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import DataTableSimpleMech from "@/features/mechanics/components/table/DataTableSimpleMech";
import ServicesCombobox from "@/features/orders/components/order-tabs/order-services/ServicesCombobox";
import {orderMechanicsColumnsDefs} from "@/features/orders/components/tables/order-mechanics/columns";
import CreateOrderServiceButton from "@/features/orders/components/order-tabs/order-services/CreateOrderServiceButton";

type Props = {};
const ServicesTabContent = (props: Props) => {
    const {id} = useParams()
    const orderId = Number(id)
    const [expanded, setExpanded] = React.useState<ExpandedState>({})

    const {data: services, isLoading} = useOrderServicesById(orderId)

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


    if (isLoading) return <LoaderSectionAnimated className={'bg-background'} text={'Загружаем...'}/>
    return (
        <>
            <Card className={''}>
                <CardHeader
                    className={'flex flex-row items-center space-y-0 justify-between     border-b rounded-lg rounded-b-none'}>
                    <ServicesCombobox orderId={orderId}/>
                    <CreateOrderServiceButton/>
                </CardHeader>
                <CardContent className={' space-y-3 shadow-inner p-0'}>
                    <Table className={'table-auto'}>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}
                                          className={'*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r bg-muted/50'}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
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
                                        <TableRow data-state={row.getIsSelected() && "selected"}
                                                  className={'hover:bg-white *:border-border hover:bg-transparent [&>:not(:last-child)]:border-r'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="py-3">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {row.getIsExpanded() && (
                                            <TableRow>
                                                <TableCell colSpan={row.getAllCells().length}
                                                           className={'bg-muted p-0'}>
                                                    <div
                                                        className={'bg-gradient-to-t from-gray-50 to-zinc-200 p-3 px-10 shadow-inner'}>
                                                        <DataTableSimpleMech
                                                            data={row.getValue('mechanics') || []}
                                                            columns={mechanicsColumns}/>
                                                    </div>

                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Ничего не найдено.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        </>
    );
};
export default ServicesTabContent;
