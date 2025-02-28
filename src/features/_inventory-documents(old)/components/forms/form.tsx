// 'use client'
// import React, {useEffect, useState} from 'react';
// import {Button} from "@/components/ui/button";
// import {Form} from "@/components/ui/form";
// import {Card, CardContent, CardHeader} from "@/components/ui/card";
// import {FileDown, Plus} from "lucide-react";
// import {Product} from "@/features/products/types";
// import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
// import {InventoryDocument, InventoryDocumentProductItem} from "@/features/inventory-documents/types";
// import {useInventoryDocumentForm} from "@/features/inventory-documents/hooks/useInventoryDocumentForm";
// import InventoryDocumentFormFields from "@/features/inventory-documents/components/forms/form-fields";
// import InventoryDocumentProductsCombobox
//     from "@/features/inventory-documents/components/InventoryDocumentProductsCombobox";
// import {Separator} from "@/components/ui/separator";
//
// type Props = {
//     documentId?: number
//     documentData?: InventoryDocument
//     onCreate?: (data: InventoryDocument) => void;
//     onUpdate?: (documentId: number) => void;
// };
//
// const InventoryDocumentForm = ({documentId, documentData, onCreate, onUpdate}: Props) => {
//     const {form, onSubmit, isLoading} = useInventoryDocumentForm({
//         documentData,
//         onCreate,
//         onUpdate
//     });
//
//     // Локальное состояние для управления списком товаров
//     const [productItems, setProductItems] = useState<InventoryDocumentProductItem[]>([]);
//     const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
//
//     // Загрузка начальных данных товаров
//     useEffect(() => {
//         if (documentData?.items) {
//             // Преобразуем items из документа в наш расширенный формат
//             const initialItems = documentData.items.map((item, index) => ({
//                 id: index + 1, // Используем индекс как временный ID
//                 productId: item.productId,
//                 productName: `Товар #${item.productId}`, // В реальности здесь нужно будет загрузить имя
//                 partNumber: `ART-${item.productId}`,
//                 brandName: 'Бренд', // Заглушка
//                 quantity: item.quantity,
//                 fromStorageLocationId: item.fromStorageLocationId,
//                 toStorageLocationId: item.toStorageLocationId,
//                 note: item.note
//             }));
//             setProductItems(initialItems);
//         }
//     }, [documentData]);
//
//     // Функции для управления товарами
//     const handleAddProduct = (product: Product) => {
//         const newItem: InventoryDocumentProductItem = {
//             id: Date.now(), // Используем timestamp как временный ID
//             productId: product.id,
//             productName: product.name,
//             partNumber: product.partNumber,
//             brandName: product.brand?.name,
//             quantity: 1, // По умолчанию количество 1
//             toStorageLocationId: undefined,
//             note: ''
//         };
//
//         setProductItems([...productItems, newItem]);
//         // setIsAddProductDialogOpen(false);
//     };
//
//     const handleUpdateQuantity = (id: number, quantity: number) => {
//         setProductItems(items =>
//             items.map(item =>
//                 item.id === id ? {...item, quantity} : item
//             )
//         );
//     };
//
//     const handleUpdateStorageLocation = (id: number, locationId: number) => {
//         setProductItems(items =>
//             items.map(item =>
//                 item.id === id ? {...item, toStorageLocationId: locationId} : item
//             )
//         );
//     };
//
//     const handleUpdateNote = (id: number, note: string) => {
//         setProductItems(items =>
//             items.map(item =>
//                 item.id === id ? {...item, note} : item
//             )
//         );
//     };
//
//     const handleRemoveItem = (id: number) => {
//         setProductItems(items => items.filter(item => item.id !== id));
//     };
//
//     // Обновление товаров в форме перед отправкой
//     const handleFormSubmit = (e: React.FormEvent) => {
//         // Преобразуем наши расширенные товары обратно в формат, ожидаемый формой
//         const formItems = productItems.map(item => ({
//             productId: item.productId,
//             quantity: item.quantity,
//             fromStorageLocationId: item.fromStorageLocationId,
//             toStorageLocationId: item.toStorageLocationId,
//             note: item.note
//         }));
//
//         // Устанавливаем значение items в форме
//         form.setValue('items', formItems);
//         // Вызываем оригинальный обработчик отправки формы
//         form.handleSubmit(onSubmit)(e);
//     };
//     return (
//         <section className={'space-y-5'}>
//             <Form {...form} >
//                 <form onSubmit={handleFormSubmit} id={'inventoryDocsForm'}>
//                     <Card>
//                         <CardHeader className={'max-w-6xl'}>
//                             <InventoryDocumentFormFields form={form}/>
//                         </CardHeader>
//
//                         <Separator/>
//
//                         <div className={'bg-muted'}>
//                             <CardHeader className={'py-3'}>
//                                 <div className="flex gap-2">
//                                     <Button variant="outline" size="sm" type={'button'} onClick={() => setIsAddProductDialogOpen(true)}>
//                                         <Plus className="h-4 w-4 mr-1"/> Добавить
//                                     </Button>
//                                     <Button variant="outline" size="sm" disabled>
//                                         Подобрать
//                                     </Button>
//                                     <Button variant="outline" size="icon" className="h-8 w-8" disabled>
//                                         <FileDown className="h-4 w-4"/>
//                                     </Button>
//                                     <Button variant="outline" size="sm" disabled>
//                                         Изменить
//                                     </Button>
//                                 </div>
//                             </CardHeader>
//
//                             <CardContent className={'rounded-lg'}>
//                                 <Card>
//                                     {/*<InventoryDocumentProductsTable*/}
//                                     {/*    items={productItems}*/}
//                                     {/*    onUpdateQuantity={handleUpdateQuantity}*/}
//                                     {/*    onUpdateStorageLocation={handleUpdateStorageLocation}*/}
//                                     {/*    onUpdateNote={handleUpdateNote}*/}
//                                     {/*    onRemoveItem={handleRemoveItem}*/}
//                                     {/*/>*/}
//                                 </Card>
//                             </CardContent>
//                         </div>
//
//                     </Card>
//
//
//                     {/* Диалог для добавления товара */}
//                     <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
//                         <DialogContent className="sm:max-w-[600px]">
//                             <DialogHeader>
//                                 <DialogTitle>Добавить товар</DialogTitle>
//                                 <DialogDescription/>
//                             </DialogHeader>
//                             <div className="py-4">
//                                 <InventoryDocumentProductsCombobox onSelectProduct={handleAddProduct}/>
//                             </div>
//                         </DialogContent>
//                     </Dialog>
//
//                 </form>
//             </Form>
//         </section>
//     );
// };
//
// export default InventoryDocumentForm;