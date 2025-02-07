import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {useOrderById} from "@/features/orders/api/queries";
import {ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable} from "@tanstack/react-table";
import {ServicesColumnDefs} from "@/features/orders/components/tables/order-services/columns";
import DataTableBasic from "@/components/common/table/data-table-basic";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

type Props = {};
const ServicesTabContent = (props: Props) => {
    const rerender = React.useReducer(() => ({}), {})[1]
    const [expanded, setExpanded] = React.useState<ExpandedState>({})

    const {id} = useParams()
    const {data} = useOrderById(+id)
    const services = data?.services || []
    const columns = useMemo(() => ServicesColumnDefs, [])

    const table = useReactTable({
        data: services,
        columns: columns,
        getSubRows: undefined,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,

        state: {
            expanded,
        },
        debugTable: true,
    })

    if (!data) return 'no data'

    return (
        <>
            <Card className={'drop-shadow-none shadow-none  '}>
                <CardHeader
                    className={'flex flex-row items-center space-y-0 justify-between  bg-muted/40  border-b rounded-lg rounded-b-none'}>
                    <Input placeholder={'Поиск услуг...'} className={'max-w-96 '}/>
                    <Button className={''} variant={'default'}>
                        <CirclePlus/>
                        Новая услуга
                    </Button>
                </CardHeader>
                <CardContent className={' space-y-3 shadow-inner p-0'}>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
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
                                        <TableRow data-state={row.getIsSelected() && "selected"} className={'hover:bg-white'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="py-3">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {row.getIsExpanded() && (
                                            <TableRow>
                                                <TableCell colSpan={ServicesColumnDefs?.length}
                                                           className={' bg-muted p-0'}>
                                                    <div
                                                        className={'bg-gradient-to-br from-gray-100 to-slate-50 p-3 px-10 shadow-inner'}>
                                                        asdsad lkasd l;akad;laksd;
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
            <div>{table.getRowModel().rows.length} Rows</div>
            <div>
            </div>
            <div>
            </div>
            <label>Expanded State:</label>
            <pre>{JSON.stringify(expanded, null, 2)}</pre>
            <label>Row Selection State:</label>
            <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
        </>
    );
};
export default ServicesTabContent;
