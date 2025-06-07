'use client'

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {IService} from "../types";
import {ServiceFormData, serviceSchema} from "../components/forms/schema";
import {useCreateService} from "@/features/services/api/mutations";

type Props = {
    serviceData?: IService;
    onUpdate?: (serviceId: number) => void;
    onCreate?: (data: IService) => void;
};

export const useServiceForm = ({serviceData, onUpdate, onCreate}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {mutate: createService, isPending} = useCreateService()
    const form = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: serviceData?.name || "",
            description: serviceData?.description || "",
            defaultDuration: serviceData?.defaultDuration || 60,
        },
    });

    const onSubmit = async (data: ServiceFormData) => {

        if (serviceData) {
            // updateService({
            //     firstName: data.firstName,
            //     lastName: data?.lastName,
            //     email: data?.email,
            //     phone: data?.phone,
            // }, {
            //     onSuccess: (data) => onUpdate && onUpdate(data.id)
            // });

        } else {
            createService(data, {
                onSuccess: (data) => onCreate && onCreate(data)
            });
        }
    };

    return {form, onSubmit, isLoading, isPending};
}; 