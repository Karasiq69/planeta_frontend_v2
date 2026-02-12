import React, { Suspense } from 'react'

import { Card } from '@/components/ui/card'
import CreateProductButton from '@/features/products/components/CreateProductButton'
import ProductsDataTable from '@/features/products/components/table/ProductsDataTable'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <section>
      <div className="space-y-5">
        <h3>Товары и запчасти</h3>
        <CreateProductButton />
        <Suspense>
          <Card>
            <ProductsDataTable />
          </Card>
        </Suspense>
      </div>
    </section>
  )
}
export default Page
