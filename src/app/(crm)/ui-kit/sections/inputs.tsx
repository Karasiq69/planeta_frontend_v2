'use client'

import { Mail, Search } from 'lucide-react'
import { useState } from 'react'

import { AppInput, AppTextarea, AppCheckbox, AppDatePicker, AppSelect } from '@/components/ds'

export function InputsSection() {
  const [date, setDate] = useState<Date>()
  const [selectValue, setSelectValue] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <section id="inputs">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Поля ввода</h2>

      <div className="space-y-8 max-w-md bg-card border rounded-md p-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppInput</h3>
          <div className="space-y-3">
            <AppInput placeholder="Обычный input" />
            <AppInput icon={Search} placeholder="С иконкой поиска" />
            <AppInput icon={Mail} placeholder="С иконкой почты" />
            <AppInput disabled placeholder="Disabled" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppTextarea</h3>
          <AppTextarea placeholder="Авторазмер textarea..." />
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppSelect</h3>
          <AppSelect
            options={[
              { label: 'Опция 1', value: '1' },
              { label: 'Опция 2', value: '2' },
              { label: 'Опция 3', value: '3' },
            ]}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Выберите опцию..."
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppDatePicker</h3>
          <AppDatePicker value={date} onChange={setDate} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppCheckbox</h3>
          <div className="space-y-2">
            <AppCheckbox label="Согласен с условиями" checked={checked} onCheckedChange={(v) => setChecked(v as boolean)} />
            <AppCheckbox label="Disabled checkbox" disabled />
          </div>
        </div>
      </div>
    </section>
  )
}
