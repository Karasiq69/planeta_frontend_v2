import React from "react";
import {ChevronLeft, Printer, Trash2} from "lucide-react";
import CarContentWrapper from "@/features/cars/components/CarContentWrapper";
import {Button} from "@/components/ui/button";
import GoBackButton from "@/components/common/GoBackButton";

type Props = {
    params: {
        id: string
    }
};
const Page = async ({params}: Props) => {
    return (
        <>
            <section>
                <div className={'space-y-5'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'flex gap-5 items-center'}>
                           <GoBackButton/>
                            <h3>Автомобиль
                            </h3>
                        </div>
                        <div className="space-x-4">
                            <Button variant="outline" size={'sm'}><Printer size={16}/></Button>
                            <Button variant="ghost" size={'sm'}><Trash2 size={16}/> Удалить автомобиль</Button>
                        </div>
                    </div>
                    <CarContentWrapper carId={params.id}/>
                </div>
            </section>

        </>
    );
};
export default Page;
