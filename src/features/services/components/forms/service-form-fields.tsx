import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    form: UseFormReturn<ServiceFormData>;
}

export const ServiceFormFields = ({ form }: Props) => {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название услуги</FormLabel>
                        <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="defaultDuration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Длительность (минуты)</FormLabel>
                        <FormControl>
                            <Input 
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
                disabled={true}
                control={form.control}
                name="requiredQualifications"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Требуемая квалификация</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}; 