'use client'

import { useState } from 'react'
import { Plus, Trash2, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatMoney } from '@/lib/utils'
import { mockServices } from '../../mock-data'
import { MockService } from '../../types'

type Props = {
  defaultValues: MockService[]
  onSave: (data: MockService[]) => void
}

export function ServicesStep({ defaultValues, onSave }: Props) {
  const [services, setServices] = useState<MockService[]>(
    defaultValues.length > 0 ? defaultValues : mockServices
  )

  const update = (next: MockService[]) => {
    setServices(next)
    onSave(next)
  }

  const addService = () => {
    update([
      ...services,
      { id: crypto.randomUUID(), name: 'Новая услуга', price: 0, category: 'Прочее' },
    ])
  }

  const removeService = (id: string) => {
    update(services.filter((s) => s.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <CardTitle>Услуги</CardTitle>
        </div>
        <CardDescription>Укажите услуги, которые вы оказываете</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between py-3 px-2 -mx-2 rounded-md transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{service.name}</span>
                <span className="text-sm text-muted-foreground">{formatMoney(service.price)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{service.category}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeService(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full" onClick={addService}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить услугу
        </Button>
      </CardContent>
    </Card>
  )
}
