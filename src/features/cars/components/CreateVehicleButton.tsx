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
import CarForm from "@/features/cars/components/forms/CarForm";

type Props = {};
const CreateVehicleButton = (props: Props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'}><CirclePlus/>Новый автомобиль</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Создание автомобиля</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    {/*<CarForm/>*/}


                </DialogContent>
            </Dialog>
        </div>
    );
};
export default CreateVehicleButton;
