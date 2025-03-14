'use client'
import React from "react";
import {useProductById} from "@/features/products/api/queries";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Pre from "@/components/ui/Pre";
import ProductForm from "@/features/products/components/forms/ProductForm";
import PageHeader from "@/components/common/PageHeader";

type Props = {
    params: {
        id: string
    }
};
const Page = ({params}: Props) => {
    const productId = Number(params.id)
    const {data: product, isLoading} = useProductById(productId)

    if (isLoading) return null
    if (!product) return null


    return (
        <>

            <section>
                <div className={'space-y-5'}>
                    <PageHeader title={`Товар ${product.name}`} showBackButton={true}/>
                    <Card className={'max-w-2xl'}>
                        <CardHeader></CardHeader>
                        <CardContent>
                           <ProductForm productData={product}/>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </>
    );
};
export default Page;
