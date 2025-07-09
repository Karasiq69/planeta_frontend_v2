'use client'
import {Card} from "@/components/ui/card";
import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import WarehouseDataTable from "@/features/warehouse/components/table/warehouse-items/WarehouseDataTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FileMinus2, FilePlus2, SquarePlus} from "lucide-react";
import {useRouter} from "next/navigation";
import {WAREHOUSE_URL} from "@/lib/constants";
import PageHeader from "@/components/common/PageHeader";
// export const metadata: Metadata = {
//     title: "Склад | CRM автосервис",
//     description: "",
// };

//todo fix use client
type Props = {};
const Page = (props: Props) => {
    const router = useRouter()

    return (
        <section>
            <div className={'space-y-5'}>
                <PageHeader title={'Склад'} showBackButton={false}/>

                <div className={'flex gap-5 items-center'}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <SquarePlus/>
                                Создать документ
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'start'}>
                            <DropdownMenuLabel>Выбрать вариант</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={()=>router.push(`${WAREHOUSE_URL}/new-receipt`)}>
                                <DropdownMenuShortcut><FilePlus2/></DropdownMenuShortcut>
                                Оформить приход
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DropdownMenuShortcut><FileMinus2/></DropdownMenuShortcut>
                                Оформить расход
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem disabled>Оформить списание</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant={'outline'}>Что-то еще сделать</Button>
                </div>
                <Card>
                    <Suspense>
                        {/*<InventoryTransactionsDataTable/>*/}
                        <WarehouseDataTable/>
                    </Suspense>
                </Card>

            </div>
        </section>
    );
};
export default Page;
          