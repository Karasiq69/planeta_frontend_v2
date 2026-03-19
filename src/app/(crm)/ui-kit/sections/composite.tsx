'use client'

import { FileText } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  AppButton,
  AppFormField,
  AppPageSection,
  AppFilterBar,
  AppEmptyState,
} from '@/components/ds'
import { Form } from '@/components/ui/form'

export function CompositeSection() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      description: '',
      status: '',
      date: undefined as Date | undefined,
      agree: false,
    },
  })

  return (
    <section id="composite">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Композитные компоненты</h2>

      <div className="space-y-12">
        <AppPageSection
          title="AppPageSection"
          actions={<AppButton size="sm" variant="outline">Действие</AppButton>}
        >
          <p className="text-sm text-muted-foreground">
            Секция страницы с заголовком и кнопками действий
          </p>
        </AppPageSection>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppFilterBar</h3>
          <div className="bg-card border rounded-md">
            <AppFilterBar
              search={{
                value: '',
                onChange: () => {},
                placeholder: 'Поиск по названию...',
              }}
              onReset={() => {}}
            />
            <div className="p-4 text-sm text-muted-foreground">Таблица будет здесь</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppEmptyState</h3>
          <div className="bg-card border rounded-md">
            <AppEmptyState
              icon={FileText}
              title="Нет документов"
              description="Создайте первый документ для начала работы"
              action={{ label: 'Создать документ', onClick: () => {} }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppFormField</h3>
          <div className="bg-card border rounded-md p-6">
          <Form {...form}>
            <form className="space-y-4 max-w-md">
              <AppFormField control={form.control} name="name" label="Имя" placeholder="Введите имя" />
              <AppFormField control={form.control} name="email" label="Email" placeholder="email@example.com" />
              <AppFormField control={form.control} name="description" label="Описание" type="textarea" placeholder="Описание..." />
              <AppFormField
                control={form.control}
                name="status"
                label="Статус"
                type="select"
                options={[
                  { label: 'Активный', value: 'active' },
                  { label: 'Черновик', value: 'draft' },
                ]}
              />
              <AppFormField control={form.control} name="date" label="Дата" type="date" />
              <AppFormField control={form.control} name="agree" label="Согласен с условиями" type="checkbox" />
            </form>
          </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
