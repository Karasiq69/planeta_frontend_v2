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
import ProductForm from "@/features/products/components/forms/ProductForm";

type Props = {};
const CreateProductButton = (props: Props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'}>
                        <CirclePlus/>
                        Новый товар</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Создание товара</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <ProductForm/>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default CreateProductButton;
