'use client'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import MechanicFormFields from "./mechanic-form-fields";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import { useMechanicForm } from "../../hooks/useMechanicForm";
import {Mechanic} from "@/features/mechanics/types";

type Props = {
    mechanicId?: number
    mechanicData?: Mechanic
    onCreate?: (data: Mechanic) => void;
    onUpdate?: (mechanicId: number) => Mechanic;
};

const MechanicForm = ({mechanicId, mechanicData, onCreate, onUpdate}: Props) => {
    const {form, onSubmit, isLoading} = useMechanicForm({mechanicData, onUpdate, onCreate})

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <MechanicFormFields form={form}/>
                    <Button disabled={isLoading} variant={'default'} className={'w-full'} type="submit">
                        {mechanicId ? 'Обновить' : 'Создать'} {isLoading && <LoaderAnimated className={'text-white'}/>}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default MechanicForm; 