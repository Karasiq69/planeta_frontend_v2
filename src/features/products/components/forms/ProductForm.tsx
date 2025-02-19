'use client'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import LoaderAnimated from "@/components/ui/LoaderAnimated"
import { Product } from "@/features/products/types"
import ProductFormFields from "@/features/products/components/forms/products-form-fields";
import {useProductForm} from "@/features/products/hooks/useProductForm";

type Props = {
    productId?: number
    productData?: Product
    onCreate?: (data: Product) => void
    onUpdate?: (productId: number) => Product
}

const ProductForm = ({ productId, productData, onCreate, onUpdate }: Props) => {
    const { form, onSubmit, isLoading } = useProductForm({ productData, onUpdate, onCreate })

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <ProductFormFields form={form} />
                    <Button
                        disabled={isLoading}
                        variant="default"
                        className="w-full"
                        type="submit"
                    >
                        {productId ? 'Обновить' : 'Создать'}
                        {isLoading && <LoaderAnimated className="text-white" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm