import React from 'react'

import PageLayout from '@/components/common/PageLayout'
import { ManageCategoriesButton } from '@/features/product-categories/components/ManageCategoriesButton'
import CreateProductButton from '@/features/products/components/CreateProductButton'
import ProductsDataTable from '@/features/products/components/table/ProductsDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Товары и запчасти' }

const Page = async () => {
  return (
    <PageLayout>
      <PageLayout.Header
        title='Товары и запчасти'
        actions={
          <>
            <ManageCategoriesButton />
            <CreateProductButton />
          </>
        }
      />
      <PageLayout.Content>
        <ProductsDataTable />
      </PageLayout.Content>
    </PageLayout>
  )
}
export default Page
