import { UseFormReturn } from "react-hook-form";
import { AppointmentFormData } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {STATION_RESOURCES} from "@/lib/constants";
import {DateTimePicker} from "@/components/ui/date-time-picker";
import {cn} from "@/lib/utils";

interface Props {
    form: UseFormReturn<AppointmentFormData>;
}

export const AppointmentFormFields = ({ form }: Props) => {

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="resource"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel>Станция</FormLabel>
                        <FormControl>
                            <Tabs
                                defaultValue={field.value || STATION_RESOURCES[0].id}
                                onValueChange={field.onChange}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-5">
                                    {STATION_RESOURCES.map((station) => (
                                        <TabsTrigger
                                            key={station.id}
                                            value={station.id}
                                            className="flex gap-2"
                                        >
                                            {station.title}
                                            <span
                                                className={'size-3 rounded-full'}
                                                style={{
                                                background:station.eventColor
                                            }}></span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название</FormLabel>
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
                        <FormLabel>Описание (не обязательно)</FormLabel>
                        <FormControl>
                            <Textarea {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Начало</FormLabel>
                            <FormControl>
                                <DateTimePicker  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Окончание</FormLabel>
                            <FormControl>
                                <DateTimePicker {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="allDay"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Весь день</FormLabel>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};