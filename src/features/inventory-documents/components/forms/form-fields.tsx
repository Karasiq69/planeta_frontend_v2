import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { InventoryDocumentFormData } from "./schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileDown, Warehouse } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {ru} from "date-fns/locale";

type Props = {
    form: UseFormReturn<InventoryDocumentFormData>
};

const InventoryDocumentFormFields = ({ form }: Props) => {
    return (
        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-2 mb-4">
            {/* Тип документа */}
            <div className="flex items-center">
                <Label htmlFor="type" className="w-28 text-muted-foreground">Тип:</Label>
                <div className="flex-1 flex gap-1">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="flex-1">
                                            <SelectValue placeholder="Выберите тип документа" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="RECEIPT">Поступление</SelectItem>
                                            <SelectItem value="EXPENSE">Расход</SelectItem>
                                            <SelectItem value="RETURN">Возврат</SelectItem>
                                            <SelectItem value="TRANSFER">Перемещение</SelectItem>
                                            <SelectItem value="WRITE_OFF">Списание</SelectItem>
                                            <SelectItem value="INVENTORY">Инвентаризация</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>



            {/* Номер документа */}
            <div className="flex items-center">
                <Label htmlFor="number" className="w-28 text-muted-foreground">Номер:</Label>
                <div className="flex-1 flex gap-1 items-center">
                    <FormField
                        disabled

                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input id="number" {...field} className="flex-1" placeholder="Авто" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Label className="w-8 text-center">от</Label>
                    <FormField
                        control={form.control}
                        name="createdAt"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    field.value.toLocaleDateString()
                                                ) : (
                                                    "Выберите дату"
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            locale={ru}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            // disabled={(date) =>
                                            //     date > new Date() || date > new Date("1900-01-01")
                                            // }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Поставщик */}
            <div className="flex items-center">
                <Label htmlFor="warehouse" className="w-28 text-muted-foreground">Поставщик:</Label>
                <div className="flex-1 flex gap-1">
                    <FormField
                        control={form.control}
                        name="supplierId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()}
                                    >
                                        <SelectTrigger
                                            className={'[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}
                                        >
                                            <SelectValue placeholder="Выбрать поставщика" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={'[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'}
                                        >
                                            <SelectItem value="1" className={'flex gap-2'}>
                                                EMEX
                                            </SelectItem>
                                            <SelectItem value="2">
                                                MOTORS MOTORS
                                            </SelectItem>
                                            <SelectItem value="3">
                                                BUGA UGA
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>


            {/* Входящий номер */}
            <div className="flex items-center">
                <Label htmlFor="incomingNumber" className="w-28 text-muted-foreground">Вх. номер:</Label>
                <div className="flex-1 flex gap-1 items-center">
                    <FormField
                        control={form.control}
                        name="incomingNumber"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input id="incomingNumber" {...field} className="flex-1" placeholder="№ договора" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Label className="w-8 text-center">от</Label>
                    <FormField
                        control={form.control}
                        name="incomingDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    field.value.toLocaleDateString()
                                                ) : (
                                                    "Выберите дату"
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            locale={ru}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            // disabled={(date) =>
                                            //     date > new Date() || date > new Date("1900-01-01")
                                            // }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Склад */}
            <div className="flex items-center">
                <Label htmlFor="warehouse" className="w-28 text-muted-foreground">Склад:</Label>
                <div className="flex-1 flex gap-1">
                    <FormField
                        control={form.control}
                        name="warehouseId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Select
                                        disabled
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()}
                                    >
                                        <SelectTrigger
                                            className={'[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}
                                        >
                                            <SelectValue placeholder="Выберите склад" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={'[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'}
                                        >
                                            <SelectItem value="1" className={'flex gap-2'}>
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Склад Маринин А.С.
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Центральный склад
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Розничный склад
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Целевой склад (для перемещений) */}
            <div className="flex items-center">
                <Label htmlFor="targetWarehouse" className="w-28 text-muted-foreground">Склад назначения:</Label>
                <div className="flex-1 flex gap-1">
                    <FormField
                        control={form.control}
                        name="targetWarehouseId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                                        value={field.value?.toString()}
                                    >
                                        <SelectTrigger
                                            className={'[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80'}
                                        >
                                            <SelectValue placeholder="Выберите склад назначения" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={'[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2'}
                                        >
                                            <SelectItem value="1" className={'flex gap-2'}>
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Склад Маринин А.С.
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Центральный склад
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <Warehouse size={16} aria-hidden="true"/>
                                                Розничный склад
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>


            {/* Организация */}
            <div className="flex items-center">
                <Label htmlFor="organization" className="w-28 text-muted-foreground">Организация:</Label>
                <div className="flex-1 flex gap-1">
                    <Select>
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Выберите организацию"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">ИП Молдован Екатерина Станиславовна</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-10 w-8">
                        <FileDown className="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            {/* Примечание */}
            <div className="col-span-full flex items-center">
                <Label htmlFor="note" className="w-28 text-muted-foreground">Примечание:</Label>
                <div className="flex-1">
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input id="note" {...field} placeholder="Дополнительная информация" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default InventoryDocumentFormFields;