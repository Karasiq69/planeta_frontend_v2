'use client'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import {ClientFormData} from "@/features/clients/components/forms/schema";

type Props = {
    form: UseFormReturn<ClientFormData>
};
const ClientFormFields = ({form}: Props) => {

    return (
        <div className={'flex flex-col gap-5'}>
            <FormField
                control={form.control}
                name="firstName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                            <Input placeholder="Иван" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Фамилия</FormLabel>
                        <FormControl>
                            <Input placeholder="Иван Иванов" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                            <Input placeholder="+7 999 123 45 67" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type={"email"} placeholder="mail@mail.ru" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

        </div>
    );
};
export default ClientFormFields;
