import { AppButton, AppCard } from '@/components/ds'

export function CardsSection() {
  return (
    <section id="cards">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Карточки</h2>

      <div className="grid grid-cols-2 gap-4">
        <AppCard>
          <p className="text-sm">Простая карточка без заголовка</p>
        </AppCard>

        <AppCard title="С заголовком">
          <p className="text-sm">Контент карточки</p>
        </AppCard>

        <AppCard
          title="С действиями"
          actions={
            <AppButton size="sm" variant="outline">
              Действие
            </AppButton>
          }
        >
          <p className="text-sm">Карточка с кнопкой в хедере</p>
        </AppCard>
      </div>
    </section>
  )
}
