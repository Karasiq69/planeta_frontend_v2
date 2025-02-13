'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {useAllMechanics} from "@/features/mechanics/api/queries";
import {OrderServiceMechanicFormData} from "@/features/orders/components/forms/service-mechanic/schema";

type Props = {
    form: UseFormReturn<OrderServiceMechanicFormData>
};

const ServiceMechanicFormFields = ({form}: Props) => {
    const { data: mechanics = [] } = useAllMechanics();

    return (
        <div className={'flex flex-col gap-5'}>
            <FormField
                control={form.control}
                name="mechanicId"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Механик</FormLabel>
                        <Select
                            disabled={true}
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите механика" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {mechanics.map((mechanic) => (
                                    <SelectItem 
                                        key={mechanic.id} 
                                        value={mechanic.id.toString()}
                                    >
                                        {mechanic.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="paymentType"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Тип оплаты</FormLabel>
                        <Select
                            disabled
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип оплаты" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="percent">Процент</SelectItem>
                                <SelectItem value="fixed">Фиксированная</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="participationPercentage"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Процент участия</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="100" 
                                {...field} 
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {/*<FormField*/}
            {/*    control={form.control}*/}
            {/*    name="paymentRate"*/}
            {/*    render={({field}) => (*/}
            {/*        <FormItem>*/}
            {/*            <FormLabel>Ставка оплаты</FormLabel>*/}
            {/*            <FormControl>*/}
            {/*                <Input */}
            {/*                    type="number" */}
            {/*                    placeholder="1000" */}
            {/*                    {...field} */}
            {/*                    onChange={e => field.onChange(Number(e.target.value))}*/}
            {/*                />*/}
            {/*            </FormControl>*/}
            {/*            <FormMessage/>*/}
            {/*        </FormItem>*/}
            {/*    )}*/}
            {/*/>*/}
        </div>
    );
};

export default ServiceMechanicFormFields; 