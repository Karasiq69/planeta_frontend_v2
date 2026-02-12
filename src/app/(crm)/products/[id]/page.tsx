'use client'
import React, { use } from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Pre from '@/components/ui/Pre'
import { useProductById } from '@/features/products/api/queries'
import ProductForm from '@/features/products/components/forms/ProductForm'

type Props = {
  params: Promise<{
    id: string
  }>
}
const Page = (props: Props) => {
  const params = use(props.params)
  const productId = Number(params.id)
  const { data: product, isLoading } = useProductById(productId)

  if (isLoading) return null
  if (!product) return null

  return (
    <>
      <section>
        <div className="space-y-5">
          <PageHeader title={`Товар ${product.name}`} showBackButton={true} />
          <Card className="max-w-2xl">
            <CardHeader></CardHeader>
            <CardContent>
              <ProductForm productData={product} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
export default Page
