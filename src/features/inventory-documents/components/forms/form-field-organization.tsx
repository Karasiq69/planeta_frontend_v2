import {useAllOrganizations} from "@/features/organizations/api/queries";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {InventoryDocumentFormData} from "@/features/inventory-documents/components/forms/schema";

interface OrganizationSelectFieldProps {
    form: UseFormReturn<InventoryDocumentFormData>;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const FormFieldOrganization: React.FC<OrganizationSelectFieldProps> = ({
                                                                           form,
                                                                           label = "Организация:",
                                                                           placeholder = "Выбрать организацию",
                                                                           className,
                                                                           disabled = false
                                                                       }) => {

    const {data: orgs, isLoading} = useAllOrganizations();

    // Получаем текущую организацию из формы для отображения
    const currentOrgId = form.watch("organizationId");

    return (
        <div className={cn("flex items-center", className)}>
            <Label className="w-28 text-muted-foreground">{label}</Label>
            <div className="flex-1">
                <FormField
                    control={form.control}
                    name="organizationId"
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <Select
                                value={field.value?.toString() || ""}
                                onValueChange={(value) => {
                                    form.setValue("organizationId", Number(value), {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                        shouldValidate: true
                                    });
                                }}
                                disabled={disabled || isLoading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder}>
                                            {orgs?.data.find(org => org.id === currentOrgId)?.name || placeholder}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {orgs?.data?.map((org) => (
                                        <SelectItem key={org.id} value={org.id.toString()}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default FormFieldOrganization;