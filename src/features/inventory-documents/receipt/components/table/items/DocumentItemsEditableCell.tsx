import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ReceiptDocumentItem} from "@/features/inventory-documents/types";
import {useUpdateReceiptDocumentItem} from "@/features/inventory-documents/receipt/api/mutations";

type DocumentItemsEditableCellProps = {
    documentId: number;
    item: ReceiptDocumentItem;
    fieldName: 'quantity' | 'price' | 'note' | 'toStorageLocationId';
    type?: 'text' | 'number' | 'select';
    min?: number;
    step?: number;
    className?: string;
    placeholder?: string;
    selectOptions?: Array<{ value: string; label: string }>;
    formatValue?: (value: any) => string;
    parseValue?: (value: string) => any;
};

export const DocumentItemsEditableCell: React.FC<DocumentItemsEditableCellProps> = ({
                                                              documentId,
                                                              item,
                                                              fieldName,
                                                              type = 'text',
                                                              min,
                                                              step,
                                                              className = "h-8",
                                                              placeholder = "",
                                                              selectOptions = [],
                                                              formatValue = (v) => v?.toString() || '',
                                                              parseValue = (v) => type === 'number' ? parseFloat(v) : v,
                                                          }) => {

      const getValue = () => {
        return item[fieldName];
    };

    const [value, setValue] = useState(formatValue(getValue()));
    const [isFocused, setIsFocused] = useState(false);

    // Используем хук мутации
    const { mutate, isPending } = useUpdateReceiptDocumentItem(documentId, item.id);

    // Обработчик изменения значения
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
        const newValue = typeof e === 'string' ? e : e.target.value;
        setValue(newValue);
    };

    // Обработчик потери фокуса
    const handleBlur = () => {
        setIsFocused(false);

        // Проверяем, изменилось ли значение
        const originalValue = formatValue(getValue());
        if (value !== originalValue) {
            // Готовим объект для мутации
            const updateData = {
                [fieldName]: parseValue(value)
            };

            // Запускаем мутацию
            mutate(updateData);
        }
    };

    // Обработчик фокуса
    const handleFocus = () => {
        setIsFocused(true);
    };

    // Рендер в зависимости от типа
    if (type === 'select') {
        return (
            <Select
                value={value}
                onValueChange={(newValue) => {
                    setValue(newValue);
                    const updateData = {
                        [fieldName]: parseValue(newValue)
                    };
                    mutate(updateData);
                }}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {selectOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }

    return (
        <Input
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={className}
            min={min}
            step={step}
            placeholder={placeholder}
        />
    );
};