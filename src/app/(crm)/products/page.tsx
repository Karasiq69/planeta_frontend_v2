import React from 'react'

import { Card } from '@/components/ui/card'

const Page = async () => {
  return (
    <section>
      <div className='space-y-5'>
        <h3>Товары и запчасти</h3>
        {/*<CreateProductButton />*/}

        <Card>{/*<ProductsDataTable />*/}</Card>
      </div>
    </section>
  )
}
export default Page
