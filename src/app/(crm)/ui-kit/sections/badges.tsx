import { AppBadge, AppStatusBadge } from '@/components/ds'

export function BadgesSection() {
  return (
    <section id="badges">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Бейджи</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppBadge — colorVariant</h3>
          <div className="flex flex-wrap gap-2">
            <AppBadge colorVariant="success">Success</AppBadge>
            <AppBadge colorVariant="warning">Warning</AppBadge>
            <AppBadge colorVariant="error">Error</AppBadge>
            <AppBadge colorVariant="info">Info</AppBadge>
            <AppBadge colorVariant="neutral">Neutral</AppBadge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppBadge — shadcn variants</h3>
          <div className="flex flex-wrap gap-2">
            <AppBadge variant="default">Default</AppBadge>
            <AppBadge variant="secondary">Secondary</AppBadge>
            <AppBadge variant="destructive">Destructive</AppBadge>
            <AppBadge variant="outline">Outline</AppBadge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AppStatusBadge</h3>
          <div className="flex flex-wrap gap-2">
            <AppStatusBadge status="new" />
            <AppStatusBadge status="draft" />
            <AppStatusBadge status="active" />
            <AppStatusBadge status="in_progress" />
            <AppStatusBadge status="completed" />
            <AppStatusBadge status="cancelled" />
            <AppStatusBadge status="unknown_status" />
          </div>
        </div>
      </div>
    </section>
  )
}
