import { UseFormReturn } from "react-hook-form";
import { OrderProductFormData } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
    form: UseFormReturn<OrderProductFormData>;
}

export const OrderProductFormFields = ({ form }: Props) => {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Наименование</FormLabel>
                        <FormControl>
                            <Input
                                disabled
                                type="text"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>ID товара</FormLabel>
                        <FormControl>
                            <Input
                                disabled
                                type="number"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Количество</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                onChange={field.onChange}
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
                                type="text"
                                step="0.01"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};