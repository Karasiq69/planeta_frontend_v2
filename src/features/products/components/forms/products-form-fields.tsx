'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./schema";

type Props = {
    form: UseFormReturn<ProductFormData>
};

const ProductFormFields = ({ form }: Props) => {
    return (
        <div className="flex flex-col gap-5">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                            <Input placeholder="Тормозной диск задний" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Описание продукта"
                                {...field}
                                value={field.value || ''}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Цена</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="partNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Партномер</FormLabel>
                            <FormControl>
                                <Input placeholder="BD-12345" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <Input placeholder="TD-002" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Вес (кг)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    {...field}
                                    onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Размеры</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ДxШxВ"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="isOriginal"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel>Оригинальная запчасть</FormLabel>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <input type="hidden" {...form.register("categoryId")} value={1} />
            <input type="hidden" {...form.register("brandId")} value={1} />
        </div>
    );
};

export default ProductFormFields;