import { useReducer, useCallback } from 'react'
import { OnboardingState, OnboardingAction, TOTAL_STEPS } from '../types'

const initialState: OnboardingState = {
  currentStep: 0,
  completedSteps: [],
  skippedSteps: [],
  data: {
    organization: null,
    employees: [],
    services: [],
    warehouse: null,
    schedule: null,
  },
}

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
        completedSteps: state.completedSteps.includes(state.currentStep)
          ? state.completedSteps
          : [...state.completedSteps, state.currentStep],
      }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      }
    case 'SKIP_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
        skippedSteps: state.skippedSteps.includes(state.currentStep)
          ? state.skippedSteps
          : [...state.skippedSteps, state.currentStep],
      }
    case 'SET_STEP_DATA': {
      const dataKeys = ['organization', 'employees', 'services', 'warehouse', 'schedule'] as const
      const key = dataKeys[action.step]
      if (!key) return state
      return {
        ...state,
        data: { ...state.data, [key]: action.data },
      }
    }
    case 'COMPLETE':
      return {
        ...state,
        completedSteps: state.completedSteps.includes(state.currentStep)
          ? state.completedSteps
          : [...state.completedSteps, state.currentStep],
      }
    default:
      return state
  }
}

export function useOnboarding() {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)

  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), [])
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), [])
  const skipStep = useCallback(() => dispatch({ type: 'SKIP_STEP' }), [])
  const setStepData = useCallback(
    (step: number, data: unknown) => dispatch({ type: 'SET_STEP_DATA', step, data }),
    []
  )
  const complete = useCallback(() => dispatch({ type: 'COMPLETE' }), [])

  return {
    ...state,
    nextStep,
    prevStep,
    skipStep,
    setStepData,
    complete,
  }
}
