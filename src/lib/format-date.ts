export const formatRelativeTime = (input: string): string => {
  const utcDate = new Date(input)
  const moscowDate = new Date(utcDate.getTime() - 3 * 3600 * 1000) // TODO fix dates (utc now moscow time)
  const now = new Date()
  const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })
  const dateFormatter = new Intl.DateTimeFormat('ru-RU')

  const diffMinutes = Math.floor((now.getTime() - moscowDate.getTime()) / 60000)
  const isToday = (date: Date) => date.toDateString() === now.toDateString()
  const isYesterday = (date: Date) => {
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    return date.toDateString() === yesterday.toDateString()
  }

  const getMinutesText = (minutes: number): string => {
    const lastDigit = minutes % 10
    const lastTwoDigits = minutes % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'минут'
    }

    if (lastDigit === 1) {
      return 'минуту'
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'минуты'
    }

    return 'минут'
  }

  if (isToday(moscowDate)) {
    if (diffMinutes < 1) return 'только что'
    if (diffMinutes < 60) return `${diffMinutes} ${getMinutesText(diffMinutes)} назад`
    return `сегодня в ${timeFormatter.format(moscowDate)}`
  }

  if (isYesterday(moscowDate)) return `вчера в ${timeFormatter.format(moscowDate)}`

  return `${dateFormatter.format(moscowDate)} в ${timeFormatter.format(moscowDate)}`
}

// Форматирование будущей даты относительно текущего момента
// "Сегодня, 18:00" / "Завтра, 10:00" / "Через 3 дня" / "15 мар, 14:00"
export const formatUpcomingDate = (input: string): string => {
  const date = new Date(input)
  const now = new Date()
  const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((startOfTarget.getTime() - startOfToday.getTime()) / 86400000)

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays)
    if (absDays === 1) return `Вчера, ${timeFormatter.format(date)}`
    return `${absDays} ${getDaysText(absDays)} назад`
  }
  if (diffDays === 0) return `Сегодня, ${timeFormatter.format(date)}`
  if (diffDays === 1) return `Завтра, ${timeFormatter.format(date)}`
  if (diffDays <= 7) return `Через ${diffDays} ${getDaysText(diffDays)}`

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + `, ${timeFormatter.format(date)}`
}

function getDaysText(days: number): string {
  const lastDigit = days % 10
  const lastTwo = days % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'дней'
  if (lastDigit === 1) return 'день'
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
  return 'дней'
}

// Функция для форматирования времени в формате ЧЧ:ММ
export const getTimeFromDate = (date: Date | null): string => {
  if (date == null) return ''
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
