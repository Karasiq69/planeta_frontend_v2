const colors = [
  { name: '--background', label: 'Background', className: 'bg-background border' },
  { name: '--foreground', label: 'Foreground', className: 'bg-foreground' },
  { name: '--primary', label: 'Primary', className: 'bg-primary' },
  { name: '--secondary', label: 'Secondary', className: 'bg-secondary border' },
  { name: '--muted', label: 'Muted', className: 'bg-muted' },
  { name: '--accent', label: 'Accent', className: 'bg-accent border' },
  { name: '--destructive', label: 'Destructive', className: 'bg-destructive' },
  { name: '--border', label: 'Border', className: 'bg-border' },
  { name: '--ring', label: 'Ring', className: 'bg-ring' },
]

export function ColorsSection() {
  return (
    <section id="colors">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Цвета</h2>
      <div className="grid grid-cols-3 gap-4">
        {colors.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div className={`size-10 rounded-md ${c.className}`} />
            <div>
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-xs text-muted-foreground font-mono">{c.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
