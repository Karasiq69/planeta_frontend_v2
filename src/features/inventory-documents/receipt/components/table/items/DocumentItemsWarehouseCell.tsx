import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAllStorageLocations} from "@/features/warehouse/api/queries";
import {StorageLocation} from "@/features/warehouse/types";
import {ReceiptDocumentItem} from "@/features/inventory-documents/types";
import {useUpdateReceiptDocumentItem} from "@/features/inventory-documents/receipt/api/mutations";

type DocumentItemsWarehouseCellProps = {
    documentId: number;
    item: ReceiptDocumentItem;
    fieldName: 'toStorageLocationId';
};

const DocumentItemsWarehouseCell: React.FC<DocumentItemsWarehouseCellProps> = ({
                                                                                   documentId,
                                                                                   item,
                                                                                   fieldName
                                                                               }) => {
    const { data: storageLocations = [], isLoading } = useAllStorageLocations();
    const { mutate } = useUpdateReceiptDocumentItem(documentId, item.id);
    // Получаем текущее значение
    const currentValue = item[fieldName]?.toString() || "";

    // Создаем отображаемую строку для ячейки
    const formatStorageLocationName = (location: StorageLocation): string => {
        const parts = [
            location.zone,
            location.rack,
            location.shelf,
            location.position
        ].filter(Boolean);

        return `${location.warehouse?.name || ''}: ${parts.join(' ')}`;
    };

    // Обработчик изменения
    const handleValueChange = (newValue: string) => {
        const updateData = {
            [fieldName]: parseInt(newValue, 10)
        };

        mutate(updateData);
    };

    return (
        <div>
            <Select
                value={currentValue}
                onValueChange={handleValueChange}
                disabled={isLoading}
            >
                <SelectTrigger className="h-8">
                    <SelectValue placeholder="Не выбрана" />
                </SelectTrigger>
                <SelectContent>
                    {/* Добавляем пустое значение */}
                    <SelectItem value="default">Не выбрана</SelectItem>

                    {/* Отображаем все доступные ячейки */}
                    {storageLocations.map((location:StorageLocation) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                            {formatStorageLocationName(location)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default DocumentItemsWarehouseCell;