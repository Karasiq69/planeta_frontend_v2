export function TypographySection() {
  return (
    <section id="typography">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Типографика</h2>
      <div className="space-y-4">
        <div><h1>Заголовок H1</h1><p className="text-xs text-muted-foreground">h1</p></div>
        <div><h2>Заголовок H2</h2><p className="text-xs text-muted-foreground">h2</p></div>
        <div><h3>Заголовок H3</h3><p className="text-xs text-muted-foreground">h3</p></div>
        <div><h4>Заголовок H4</h4><p className="text-xs text-muted-foreground">h4</p></div>
        <div><h5>Заголовок H5</h5><p className="text-xs text-muted-foreground">h5</p></div>
        <div><p className="text-base">Основной текст — 14px (text-base на md)</p></div>
        <div><p className="text-sm text-muted-foreground">Вторичный текст — text-sm text-muted-foreground</p></div>
        <div><p className="text-xs text-muted-foreground">Мелкий текст — text-xs text-muted-foreground</p></div>
      </div>
    </section>
  )
}
