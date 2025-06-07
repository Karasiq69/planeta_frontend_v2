// 'use client'
// import {Card} from "@/components/ui/card";
// import React, {Suspense} from "react";
// import {Button} from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {ArrowLeftRight, BookX, ChevronDown, FileMinus2, FilePlus2, Layers2, SquarePlus} from "lucide-react";
// import {useRouter} from "next/navigation";
// import {INVENTORY_DOCUMENTS_URL, WAREHOUSE_URL} from "@/lib/constants";
// import PageHeader from "@/components/common/PageHeader";
// import InventoryDocumentsDatatable from "@/features/__inventory-documents_/components/table/InventoryDocumentsDatatable";
// import CreateInventoryDocumentButton from "@/features/__inventory-documents_/components/CreateInventoryDocumentButton";
// import {DropdownMenuWithIcons, DropdownWithIconMenuItem} from "@/components/DropdownMenuWithIcons";
// import {useCreateDraftDocument} from "@/features/__inventory-documents_/api/mutations";
// import {InventoryDocumentType} from "@/features/__inventory-documents_/types";
//
// type Props = {};
// const Page = (props: Props) => {
//     const router = useRouter();
//     const { mutate, isPending } = useCreateDraftDocument();
//
//     // Создаем общий обработчик для разных типов документов
//     const handleDocumentCreate = (type: InventoryDocumentType, redirectPath: string) => {
//         mutate({type, warehouseId: 1}, {
//             onSuccess: (data) => {
//                 // Перенаправление на страницу после успешной мутации
//                 // Предполагается, что data содержит id созданного документа
//                 if (data && data.id) {
//                     router.push(`${INVENTORY_DOCUMENTS_URL}/${data.id}`);
//                 } else {
//                     router.push(redirectPath);
//                 }
//             }
//         });
//     };
//
//     // Специфические обработчики для каждого типа документа
//     const handleTransferClick = () =>
//         handleDocumentCreate(InventoryDocumentType.TRANSFER, `${INVENTORY_DOCUMENTS_URL}/transfer`);
//
//     const handleReceiptClick = () =>
//         handleDocumentCreate(InventoryDocumentType.RECEIPT, `${INVENTORY_DOCUMENTS_URL}/receipt`);
//
//     const handleExpenseClick = () =>
//         handleDocumentCreate(InventoryDocumentType.EXPENSE, `${INVENTORY_DOCUMENTS_URL}/expense`);
//
//     const handleWriteOffClick = () =>
//         handleDocumentCreate(InventoryDocumentType.WRITE_OFF, `${INVENTORY_DOCUMENTS_URL}/write-off`);
//
//     const dropdownItems: DropdownWithIconMenuItem[] = [
//         {
//             key: InventoryDocumentType.RECEIPT.toLowerCase(),
//             title: 'Приход',
//             icon: FilePlus2,
//             onClick: handleReceiptClick
//         },
//         {
//             key: InventoryDocumentType.EXPENSE.toLowerCase(),
//             title: 'Расход',
//             icon: FileMinus2,
//             onClick: handleExpenseClick
//         },
//         {
//             key: InventoryDocumentType.TRANSFER.toLowerCase(),
//             title: 'Перемещение',
//             icon: ArrowLeftRight,
//             onClick: handleTransferClick
//         },
//         {
//             key: InventoryDocumentType.WRITE_OFF.toLowerCase(),
//             title: 'Списание',
//             icon: BookX,
//             onClick: handleWriteOffClick
//         },
//         {
//             key: 'leftovers', // Этот пункт не связан с созданием документа
//             title: 'Остатки',
//             icon: Layers2,
//             url: `${WAREHOUSE_URL}/leftovers`
//         }
//     ];
//
//     return (
//         <section>
//             <div className={'space-y-5'}>
//                 <PageHeader title={'Инвентарь документы'} showBackButton={false}/>
//
//                 <div className={'flex gap-5 items-center'}>
//                     <DropdownMenuWithIcons items={dropdownItems}>
//                         <Button variant="default" disabled={isPending}>
//                             {isPending ? 'Создание...' : 'Создать документ'}
//                             <ChevronDown
//                                 size={16}
//                                 strokeWidth={2}
//                                 aria-hidden="true"
//                             />
//                         </Button>
//                     </DropdownMenuWithIcons>
//                     <CreateInventoryDocumentButton/>
//
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild disabled>
//                             <Button>
//                                 <SquarePlus/>
//                                 Новый документ
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align={'start'}>
//                             <DropdownMenuLabel>Выбрать вариант</DropdownMenuLabel>
//                             <DropdownMenuSeparator/>
//                             <DropdownMenuItem onClick={() => router.push(`${WAREHOUSE_URL}/new-receipt`)}>
//                                 <DropdownMenuShortcut><FilePlus2/></DropdownMenuShortcut>
//                                 Оформить приход
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 <DropdownMenuShortcut><FileMinus2/></DropdownMenuShortcut>
//                                 Оформить расход
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator/>
//                             <DropdownMenuItem disabled>Оформить списание</DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                     <Button variant={'outline'} disabled>Что-то еще сделать</Button>
//                 </div>
//                 <Card>
//                     <Suspense>
//                         <InventoryDocumentsDatatable/>
//                     </Suspense>
//                 </Card>
//             </div>
//         </section>
//     );
// };
// export default Page;


type Props = {};
const Page = (props: Props) => {
    return (
        <div>Page</div>
    );
};
export default Page;
