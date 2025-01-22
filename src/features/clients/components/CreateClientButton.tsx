import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import ClientForm from "@/features/clients/components/forms/ClientForm";
import BusinessClientForm from "@/features/clients/components/forms/BusinessClientForm";

type Props = {};
const CreateClientButton = (props: Props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'}><CirclePlus/>Новый клиент</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Создание клиента</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="regular-client" className="grid w-full">
                        <TabsList className={''}>
                            <TabsTrigger value="regular-client" className={'w-full'}>Физлицо</TabsTrigger>
                            <TabsTrigger value="business-client" className={'w-full'}>Юрлицо</TabsTrigger>
                        </TabsList>
                        <TabsContent value="regular-client">
                            <ClientForm/>
                        </TabsContent>
                        <TabsContent value="business-client">
                            <BusinessClientForm/>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

        </div>
    );
};
export default CreateClientButton;
