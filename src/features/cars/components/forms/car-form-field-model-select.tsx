'use client'
import React, {useMemo, useState} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {UseFormReturn} from "react-hook-form";
import {useVehiclesModels} from "@/features/cars/api/queries";
import {getModelFullName} from "@/features/cars/utils";
import {ICarModel} from "@/features/cars/types";

interface ModelSelectProps {
    form: UseFormReturn<any>;
}

const CarFormFieldModelSelect = ({form}: ModelSelectProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const brandWatch = form.watch("brandId");
    const {data: models = [], isLoading} = useVehiclesModels(brandWatch);

    const filteredModels = useMemo(() =>
            models.filter(model =>
                model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (model.series && model.series.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (model.code && model.code.toLowerCase().includes(searchTerm.toLowerCase()))
            ),
        [models, searchTerm]
    );

    return (
        <FormField
            control={form.control}
            name="modelId"
            render={({field}) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Модель</FormLabel>
                    <Popover open={open} onOpenChange={setOpen} modal={false}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "justify-between hover:bg-white",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? getModelFullName(models?.find((model) => String(model.id) === field.value) as ICarModel)
                                        : "Выберите модель"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                            <Command>
                                <CommandInput
                                    className={' w-[1200px] '}
                                    placeholder="Поиск модели..."
                                    value={searchTerm}
                                    onValueChange={setSearchTerm}
                                />
                                <CommandEmpty>Модель не найдена.</CommandEmpty>
                                <CommandList>
                                    <CommandGroup>
                                        {filteredModels.map((model) => (
                                            <CommandItem
                                                key={model.id}
                                                value={`${model.name} ${model.series || ''} ${model.code || ''}`}
                                                onSelect={() => {
                                                    form.setValue("modelId", String(model.id));
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === String(model.id) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {getModelFullName(model)}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default CarFormFieldModelSelect;