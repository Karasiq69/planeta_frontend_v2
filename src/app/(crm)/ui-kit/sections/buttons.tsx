import { Plus, Save, Trash2 } from 'lucide-react'

import { AppButton } from '@/components/ds'

export function ButtonsSection() {
  return (
    <section id="buttons">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Кнопки</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Варианты</h3>
          <div className="flex flex-wrap gap-3">
            <AppButton>Default</AppButton>
            <AppButton variant="secondary">Secondary</AppButton>
            <AppButton variant="outline">Outline</AppButton>
            <AppButton variant="ghost">Ghost</AppButton>
            <AppButton variant="destructive">Destructive</AppButton>
            <AppButton variant="link">Link</AppButton>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Размеры</h3>
          <div className="flex flex-wrap items-center gap-3">
            <AppButton size="sm">Small</AppButton>
            <AppButton size="default">Default</AppButton>
            <AppButton size="lg">Large</AppButton>
            <AppButton size="icon" icon={Plus} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">С иконками</h3>
          <div className="flex flex-wrap gap-3">
            <AppButton icon={Plus}>Добавить</AppButton>
            <AppButton icon={Save} variant="secondary">Сохранить</AppButton>
            <AppButton icon={Trash2} variant="destructive">Удалить</AppButton>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Состояния</h3>
          <div className="flex flex-wrap gap-3">
            <AppButton loading>Загрузка...</AppButton>
            <AppButton disabled>Disabled</AppButton>
          </div>
        </div>
      </div>
    </section>
  )
}
