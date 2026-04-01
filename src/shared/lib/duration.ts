/** Минуты → строка для отображения: "1.5 ч" */
export const formatDurationHours = (minutes: number): string => {
  const hours = minutes / 60
  return `${parseFloat(hours.toFixed(2))} ч`
}

/** Часы (дробные) → минуты */
export const hoursToMinutes = (hours: number): number => Math.round(hours * 60)

/** Минуты → часы (дробные) */
export const minutesToHours = (minutes: number): number => parseFloat((minutes / 60).toFixed(2))
