'use client'
import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import ClientFormFields from "@/features/clients/components/forms/client-form-fields";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import {IClient} from "@/features/clients/types";
import {useClientForm} from "@/features/clients/hooks/useClientForm";

type Props = {
    clientId?: number
    clientData?: IClient | undefined
};
const ClientForm = ({clientId, clientData}: Props) => {
    const {form, onSubmit, isLoading} = useClientForm({clientData})

    return (
        <div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <ClientFormFields form={form}/>
                    <Button disabled={isLoading} variant={'default'} className={'w-full'} type="submit">
                        {clientId ? 'Обновить' : 'Создать'} {isLoading && <LoaderAnimated className={'text-white'}/>}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
export default ClientForm;
