import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAllStorageLocations} from "@/features/warehouse/api/queries";
import {DocumentItem} from "@/features/inventory-documents/types";
import {StorageLocation} from "@/features/warehouse/types";
import {useUpdateDocumentItem} from "@/features/inventory-documents/api/mutations";

type DocumentItemsWarehouseCellProps = {
    documentId: number;
    item: DocumentItem;
    fieldName: 'toStorageLocationId' | 'fromStorageLocationId';
};

const DocumentItemsWarehouseCell: React.FC<DocumentItemsWarehouseCellProps> = ({
                                                                                   documentId,
                                                                                   item,
                                                                                   fieldName
                                                                               }) => {
    const { data: storageLocations = [], isLoading } = useAllStorageLocations();
    const { mutate } = useUpdateDocumentItem(documentId, item.id);
    console.log(storageLocations)
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

        return `${location.warehouse?.name || ''}: ${parts.join('-')}`;
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
                    {storageLocations.map((location) => (
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