'use client'

import { useState } from 'react'
import { Clock } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { mockSchedule } from '../../mock-data'
import { ScheduleDay, ScheduleFormData } from '../../types'

type Props = {
  defaultValues?: ScheduleFormData | null
  onSave: (data: ScheduleFormData) => void
}

export function ScheduleStep({ defaultValues, onSave }: Props) {
  const [days, setDays] = useState<ScheduleDay[]>(
    defaultValues?.days ?? mockSchedule.days
  )

  const updateDay = (index: number, patch: Partial<ScheduleDay>) => {
    const next = days.map((d, i) => (i === index ? { ...d, ...patch } : d))
    setDays(next)
    onSave({ days: next })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>Рабочий график</CardTitle>
        </div>
        <CardDescription>Настройте часы работы</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {days.map((day, i) => (
            <div key={day.day} className="flex items-center gap-4 py-3">
              <span className="min-w-32 font-medium">{day.day}</span>
              <Switch
                checked={day.enabled}
                onCheckedChange={(enabled) => updateDay(i, { enabled })}
              />
              <Input
                type="time"
                value={day.startTime}
                disabled={!day.enabled}
                className={`w-32 ${!day.enabled ? 'opacity-50' : ''}`}
                onChange={(e) => updateDay(i, { startTime: e.target.value })}
              />
              <span className="text-muted-foreground">—</span>
              <Input
                type="time"
                value={day.endTime}
                disabled={!day.enabled}
                className={`w-32 ${!day.enabled ? 'opacity-50' : ''}`}
                onChange={(e) => updateDay(i, { endTime: e.target.value })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
