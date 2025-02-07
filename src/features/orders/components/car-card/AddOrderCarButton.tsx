import {useParams} from "next/navigation";
import {ICar} from "@/features/cars/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CirclePlus, Search, UserRoundPlus} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React from "react";
import CarForm from "@/features/cars/components/forms/CarForm";
import CarCombobox from "@/components/cars/CarCombobox";
import {useEditOrderCar} from "@/features/orders/api/mutations";

type Props = {};
const AddOrderCarButton = (props: Props) => {
    const {id} = useParams()
    const {mutate, isPending} = useEditOrderCar(Number(id))

    const handleSelect = (car: ICar) => {
        mutate({carId: car.id})
    }

    const onCreate = (car: ICar) => {
        mutate({id: car.id})
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <UserRoundPlus size={16}/>
                        Добавить автомобиль
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full   h-auto ">
                    <DialogHeader>
                        <DialogTitle>Добавление автомобиля</DialogTitle>
                        <DialogDescription>Выберите необходимую опцию</DialogDescription>
                    </DialogHeader>
                    <div>
                        <Tabs defaultValue="findCar" className="">
                            <TabsList className={'grid w-full grid-cols-2'}>
                                <TabsTrigger value="findCar" className={'gap-1'}>
                                    <Search size={16}/> Найти автомобиль
                                </TabsTrigger>
                                <TabsTrigger value="newCar"
                                             className={'gap-1'}
                                >
                                    <CirclePlus size={16}/>Создать автомобиль
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="findCar">
                                <CarCombobox handleSelect={handleSelect}/>
                            </TabsContent>
                            <TabsContent value="newCar">
                                <CarForm onCreate={onCreate}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    );
};
export default AddOrderCarButton;
