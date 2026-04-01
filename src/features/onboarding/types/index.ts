export type OrganizationFormData = {
  name: string
  inn: string
  address: string
  phone: string
  email: string
}

export type MockEmployee = {
  id: string
  name: string
  role: string
  email: string
}

export type MockService = {
  id: string
  name: string
  price: number
  category: string
}

export type WarehouseFormData = {
  name: string
  address: string
}

export type ScheduleDay = {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

export type ScheduleFormData = {
  days: ScheduleDay[]
}

export type OnboardingState = {
  currentStep: number
  completedSteps: number[]
  skippedSteps: number[]
  data: {
    organization: OrganizationFormData | null
    employees: MockEmployee[]
    services: MockService[]
    warehouse: WarehouseFormData | null
    schedule: ScheduleFormData | null
  }
}

export type OnboardingAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SKIP_STEP' }
  | { type: 'SET_STEP_DATA'; step: number; data: unknown }
  | { type: 'COMPLETE' }

export const ONBOARDING_STEPS = [
  { label: 'Организация', skippable: false },
  { label: 'Сотрудники', skippable: true },
  { label: 'Работы', skippable: true },
  { label: 'Склад', skippable: true },
  { label: 'График', skippable: true },
  { label: 'Готово', skippable: false },
] as const

export const TOTAL_STEPS = ONBOARDING_STEPS.length
