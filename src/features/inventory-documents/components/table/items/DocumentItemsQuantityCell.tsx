import * as React from "react";
import {QuantityInput} from "@/components/ui/quantity-input";
import {DocumentItem} from "@/features/inventory-documents/types";
import {useDebounce} from "@/hooks/use-debounce";
import {useUpdateDocumentItem} from "@/features/inventory-documents/api/mutations";

interface DocumentItemsQuantityCellProps {
    documentId: number;
    item: DocumentItem;
    fieldName: 'quantity';
    className?: string;
    containerClassName?: string;
    minValue?: number;
    maxValue?: number;
    step?: number;
    width?: string;
    disabled?: boolean;
}

export const DocumentItemsQuantityCell: React.FC<DocumentItemsQuantityCellProps> = ({
                                                                                documentId,
                                                                                item,
                                                                                fieldName,
                                                                                className,
                                                                                containerClassName,
                                                                                minValue = 0.001,
                                                                                maxValue,
                                                                                step = 0.001,
                                                                                width,
                                                                                disabled = false,
                                                                            }) => {
    const defaultValue = Number(item[fieldName]) || 0;
    const [value, setValue] = React.useState<number>(defaultValue);
    const debouncedValue = useDebounce(value, 500); // Задержка 500 мс перед отправкой мутации

    // Используем хук мутации
    const {mutate, isPending} = useUpdateDocumentItem(documentId, item.id);

    // Отслеживаем изменения в значении после дебаунса
    React.useEffect(() => {
        // Проверяем изменилось ли значение и не равно ли оно первоначальному
        if (debouncedValue !== defaultValue) {
            const updateData = {
                [fieldName]: debouncedValue
            };

            // Запускаем мутацию
            mutate(updateData);
        }
    }, [debouncedValue, defaultValue, fieldName, mutate]);

    // Обработчик изменения от QuantityInput
    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    return (
        <QuantityInput
            defaultValue={defaultValue}
            // value={value}
            onChange={handleChange}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            width={width}
            className={className}
            containerClassName={containerClassName}
            disabled={disabled || isPending}
        />
    );
};