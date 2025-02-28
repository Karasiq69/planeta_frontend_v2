import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {InventoryDocumentProductItem} from "@/features/inventory-documents/types";

type InventoryDocumentProductsTableProps = {
    items: InventoryDocumentProductItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onUpdateStorageLocation: (id: number, locationId: number) => void;
    onUpdateNote: (id: number, note: string) => void;
    onRemoveItem: (id: number) => void;
};

const InventoryDocumentProductsTable = ({
                                            items,
                                            onUpdateQuantity,
                                            onUpdateStorageLocation,
                                            onUpdateNote,
                                            onRemoveItem
                                        }: InventoryDocumentProductsTableProps) => {
    return (
        <div className="[&>div]:max-h-[380px] p-2">
            <Table className="table-auto">
                <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
                    <TableRow>
                        <TableHead className="w-12">№</TableHead>
                        <TableHead>Номенклатура</TableHead>
                        <TableHead>Артикул</TableHead>
                        <TableHead className="w-24">Количество</TableHead>
                        <TableHead>Ячейка</TableHead>
                        <TableHead>Примечание</TableHead>
                        <TableHead className="w-16">Действия</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                Нет товаров в документе. Добавьте товар, используя кнопку "Добавить".
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item.productName}
                                    {item.brandName && (
                                        <div className="text-xs text-muted-foreground">{item.brandName}</div>
                                    )}
                                </TableCell>
                                <TableCell>{item.partNumber || '-'}</TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => onUpdateQuantity(item.id, parseFloat(e.target.value) || 0)}
                                        min={0.001}
                                        step={0.001}
                                        className="h-8"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.toStorageLocationId?.toString()}
                                        onValueChange={(value) => onUpdateStorageLocation(item.id, parseInt(value))}
                                    >
                                        <SelectTrigger className="h-8">
                                            <SelectValue placeholder="Не выбрана" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">A-1-2-3</SelectItem>
                                            <SelectItem value="2">B-1-2-3</SelectItem>
                                            <SelectItem value="3">C-1-2-3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={item.note || ''}
                                        onChange={(e) => onUpdateNote(item.id, e.target.value)}
                                        className="h-8"
                                        placeholder="Примечание к товару"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default InventoryDocumentProductsTable;