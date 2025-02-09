import React, {useMemo} from "react";
import {useParams} from "next/navigation";
import {useOrderServicesById} from "@/features/orders/api/queries";
import {
    ExpandedState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    Row,
    useReactTable
} from "@tanstack/react-table";
import {ServicesColumnDefs} from "@/features/orders/components/tables/order-services/columns";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {OrderService, OrderServiceMechanic} from "@/features/orders/types";
import {toast} from "@/hooks/use-toast";
import {MechanicCard} from "@/features/orders/components/order-tabs/order-services/MechanicCard";
import LoaderSectionAnimated from "@/components/ui/LoaderSectionAnimated";
import DataTableSimpleMech from "@/features/mechanics/components/table/DataTableSimpleMech";
import {serviceMechanicsColumnsDefs} from "@/features/mechanics/components/table/ServiceMechanicsColumnsDefs";

type Props = {};
const ServicesTabContent = (props: Props) => {
    const rerender = React.useReducer(() => ({}), {})[1]
    const [expanded, setExpanded] = React.useState<ExpandedState>({})

    const {id} = useParams()
    const {data, isLoading} = useOrderServicesById(+id)

    const services = data || []
    const columns = useMemo(() => ServicesColumnDefs, [])
    const mechanicsColumns = useMemo(() => serviceMechanicsColumnsDefs, [])

    const table = useReactTable({
        data: services,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        state: {
            expanded,
        },
    })


    if (isLoading) return <LoaderSectionAnimated className={'bg-background'} text={'Загружаем...'}/>

    const renderSubComponent = ({row}: { row: Row<OrderService> }) => {
        const handleUpdate = async (mechanicId: number, data: Partial<OrderServiceMechanic>) => {
            try {
                // Здесь добавьте вызов API для обновления данных механика
                console.log('RENDER HITTTT', mechanicId, data)
                // await updateServiceMechanic(row.original.id, mechanicId, data);
                // Добавьте обновление состояния таблицы/данных
            } catch (error) {
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить данные механика",
                    variant: "destructive"
                });
            }
        };

        return (
            <div className="grid gap-1 p-0">
                {row.original.mechanics?.map((mechanic) => (
                    <MechanicCard
                        key={mechanic.id}
                        mechanic={mechanic}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
        );
    };
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
                        <TableHeader >
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
                                        <TableRow data-state={row.getIsSelected() && "selected"}
                                                  className={'hover:bg-white'}>
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
                                                        {/*{renderSubComponent({row})}*/}
                                                        <DataTableSimpleMech
                                                            data={row.getValue('mechanics') || []}
                                                            columns={mechanicsColumns}/>
                                                        {/*<pre>*/}

                                                        {/*    {JSON.stringify(row.getValue('mechanics'), null, 2) || 'sex'}*/}
                                                        {/*    {JSON.stringify(row.subRows, null, 2)}*/}
                                                        {/*</pre>*/}
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
