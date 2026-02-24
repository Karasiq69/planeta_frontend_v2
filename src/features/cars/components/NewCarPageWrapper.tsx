'use client'
import { Printer, Trash2 } from 'lucide-react'
import React from 'react'

import PageHeader from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { CarFormFieldBrandSelect } from '@/features/cars/components/forms/car-form-field-brand'
import CarForm from '@/features/cars/components/forms/CarForm'

type Props = {}
const NewCarPageWrapper = (props: Props) => {
  return (
    <div className="space-y-5">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-5 items-center">
            <PageHeader title="Создание нового автомобиля" showBackButton={true} />
          </div>

          <div className='space-x-4'>
            <Button variant='outline' disabled size="sm">
              <Printer size={16} />
            </Button>
            <Button variant='ghost' disabled size="sm">
              <Trash2 size={16} /> Удалить авто
            </Button>
          </div>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CarForm />
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}
export default NewCarPageWrapper
