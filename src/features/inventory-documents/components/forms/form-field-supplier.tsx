import React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Control } from 'react-hook-form';
import { Supplier } from "@/features/suppliers/types";
import { InventoryDocumentFormData } from '@/features/inventory-documents/components/forms/schema';
import SuppliersCombobox from "@/features/suppliers/components/SuppliersCombobox";

interface SuppliersSelectFieldProps {
    control: Control<InventoryDocumentFormData>;
    name: 'supplierId';
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const SuppliersSelectField: React.FC<SuppliersSelectFieldProps> = ({
                                                                       control,
                                                                       name,
                                                                       label = "Поставщик:",
                                                                       placeholder = "Выбрать поставщика",
                                                                       className,
                                                                       disabled = false
                                                                   }) => {
    return (
        <div className={cn("flex items-center", className)}>
            <Label htmlFor="supplier" className="w-28 text-muted-foreground">{label}</Label>
            <div className="flex-1">
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <SuppliersCombobox
                                    initialValue={field.value}
                                    onSelect={(supplier: Supplier) => field.onChange(supplier.id)}
                                    isPending={disabled}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default SuppliersSelectField;