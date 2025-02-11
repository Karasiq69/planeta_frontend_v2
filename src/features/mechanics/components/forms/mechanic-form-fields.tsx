'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { MechanicFormData } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    form: UseFormReturn<MechanicFormData>
};

const MechanicFormFields = ({form}: Props) => {
    return (
        <div className={'flex flex-col gap-5'}>
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>ФИО механика</FormLabel>
                        <FormControl>
                            <Input placeholder="Иванов Иван Иванович" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="specialization"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Специализация</FormLabel>
                        <FormControl>
                            <Input placeholder="Моторист" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="qualifications"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Квалификация</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Опишите квалификацию механика" 
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="hourlyRate"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Почасовая ставка</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="1000" 
                                {...field} 
                                onChange={e => field.onChange(Number(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="isActive"
                render={({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormLabel>Активный механик</FormLabel>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default MechanicFormFields; 