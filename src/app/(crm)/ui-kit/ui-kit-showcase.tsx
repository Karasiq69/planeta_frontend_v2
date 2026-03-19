'use client'

import { TypographySection } from './sections/typography'
import { ColorsSection } from './sections/colors'
import { ButtonsSection } from './sections/buttons'
import { InputsSection } from './sections/inputs'
import { BadgesSection } from './sections/badges'
import { CardsSection } from './sections/cards'
import { DialogsSection } from './sections/dialogs'
import { CompositeSection } from './sections/composite'

const sections = [
  { id: 'typography', label: 'Типографика' },
  { id: 'colors', label: 'Цвета' },
  { id: 'buttons', label: 'Кнопки' },
  { id: 'inputs', label: 'Поля ввода' },
  { id: 'badges', label: 'Бейджи' },
  { id: 'cards', label: 'Карточки' },
  { id: 'dialogs', label: 'Диалоги и Sheet' },
  { id: 'composite', label: 'Композитные' },
] as const

export default function UIKitShowcase() {
  return (
    <div className="flex h-full">
      <nav className="sticky top-0 w-48 shrink-0 border-r p-4 space-y-1 overflow-y-auto h-screen">
        <h2 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
          UI Kit
        </h2>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-sm py-1.5 px-2 rounded-md hover:bg-accent text-foreground/80 hover:text-foreground transition-colors"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto p-8 space-y-16">
        <div>
          <h1 className="text-2xl font-bold mb-2">Дизайн-система Planeta CRM</h1>
          <p className="text-muted-foreground">
            Справочник всех компонентов. Доступен только в режиме разработки.
          </p>
        </div>

        <TypographySection />
        <ColorsSection />
        <ButtonsSection />
        <InputsSection />
        <BadgesSection />
        <CardsSection />
        <DialogsSection />
        <CompositeSection />
      </main>
    </div>
  )
}
