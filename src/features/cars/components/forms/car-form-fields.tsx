import {UseFormReturn} from "react-hook-form";
import {CarFormData} from "@/features/cars/components/forms/schema";
import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CarFormFieldBrandSelect} from "@/features/cars/components/forms/car-form-field-brand";
import CarFormFieldModelSelect from "@/features/cars/components/forms/car-form-field-model-select";

type Props = {
    form: UseFormReturn<CarFormData>

};
const CarFormFields = ({form}: Props) => {

    return (
        <div className={'space-y-5'}>
            <CarFormFieldBrandSelect form={form}/>
            <CarFormFieldModelSelect form={form}/>

            <FormField
            control={form.control}
            name="vin"
            render={({field}) => (
                <FormItem>
                    <FormLabel>VIN</FormLabel>
                    <FormControl>
                        <Input placeholder="ZJSDW7Q87DSA7DW6" {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
            <div className={'grid grid-cols-2 gap-5'}>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="year"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Год</FormLabel>
                                <FormControl>
                                    <Input className={''} type="number" placeholder="2020" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Госномер</FormLabel>
                            <FormControl>
                                <Input placeholder="Е 666 КХ 177" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};
export default CarFormFields;
