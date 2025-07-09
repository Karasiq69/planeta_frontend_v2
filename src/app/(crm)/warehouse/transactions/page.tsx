'use client'
import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import {ArrowLeftRight, BookX, FileMinus2, FilePlus2, Layers2, SquarePlus} from "lucide-react";
import {INVENTORY_DOCUMENTS_URL, WAREHOUSE_URL} from "@/lib/constants";
import PageHeader from "@/components/common/PageHeader";
import InventoryTransactionsDataTable
    from "@/features/transactions/components/table/transactions/InventoryTransactionsDataTable";
import {DropdownMenuWithIcons, DropdownWithIconMenuItem} from "@/components/DropdownMenuWithIcons";


const dropdownItems: DropdownWithIconMenuItem[] = [
    {
        key: 'new-receipt',
        title: 'Приход',
        icon: FilePlus2,
        url: `${WAREHOUSE_URL}/new-receipt`
    },
    {
        key: 'expense',
        title: 'Расход',
        icon: FileMinus2,
        url: `${WAREHOUSE_URL}/expense`
    },
    {
        key: 'transfer',
        title: 'Перемещение',
        icon: ArrowLeftRight,
        url: `${INVENTORY_DOCUMENTS_URL}/transfer`
    },
    {
        key: 'write-off',
        title: 'Списание',
        icon: BookX,
        url: `${WAREHOUSE_URL}/write-off`
    },
    {
        key: 'leftovers',
        title: 'Остатки',
        icon: Layers2,
        url: `${WAREHOUSE_URL}/leftovers`
    }
];

const Page = () => {

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Движение товаров'} showBackButton={false}/>

                <div className={'flex gap-5 items-center'}>
                    <DropdownMenuWithIcons items={dropdownItems}>
                        <Button variant="default">

                            <SquarePlus

                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                            Создать документ
                        </Button>
                    </DropdownMenuWithIcons>


                    {/*<DropdownMenu>*/}
                    {/*    <DropdownMenuTrigger asChild>*/}
                    {/*        <Button>*/}
                    {/*            <SquarePlus/>*/}
                    {/*            Создать накладную?*/}
                    {/*        </Button>*/}
                    {/*    </DropdownMenuTrigger>*/}
                    {/*    <DropdownMenuContent align={'start'}>*/}
                    {/*        <DropdownMenuLabel>Выбрать вариант</DropdownMenuLabel>*/}
                    {/*        <DropdownMenuSeparator/>*/}
                    {/*        <DropdownMenuItem onClick={() => router.push(`${WAREHOUSE_URL}/new-receipt`)}>*/}
                    {/*            <DropdownMenuShortcut><FilePlus2/></DropdownMenuShortcut>*/}
                    {/*            Оформить приход*/}
                    {/*        </DropdownMenuItem>*/}
                    {/*        <DropdownMenuItem>*/}
                    {/*            <DropdownMenuShortcut><FileMinus2/></DropdownMenuShortcut>*/}
                    {/*            Оформить расход*/}
                    {/*        </DropdownMenuItem>*/}
                    {/*        <DropdownMenuSeparator/>*/}
                    {/*        <DropdownMenuItem disabled>Оформить списание</DropdownMenuItem>*/}
                    {/*    </DropdownMenuContent>*/}
                    {/*</DropdownMenu>*/}
                    <Button variant={'outline'} disabled>Что-то еще сделать!!</Button>
                </div>
                <Card>
                    <Suspense>
                        {/*<InventoryTransactionsDataTable/>*/}
                        <InventoryTransactionsDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default Page;
