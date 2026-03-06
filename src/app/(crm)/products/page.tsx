import React from 'react'

import { Card } from '@/components/ui/card'
import { ManageCategoriesButton } from '@/features/product-categories/components/ManageCategoriesButton'
import CreateProductButton from '@/features/products/components/CreateProductButton'
import ProductsDataTable from '@/features/products/components/table/ProductsDataTable'

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Товары и запчасти' }

const Page = async () => {
  return (
    <section>
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <h3>Товары и запчасти</h3>
          <div className='flex gap-2'>
            <ManageCategoriesButton />
            <CreateProductButton />
          </div>
        </div>

        <Card><ProductsDataTable /></Card>
      </div>
    </section>
  )
}
export default Page
