'use client'

import { Check, SkipForward } from 'lucide-react'
import React, { createContext, useContext } from 'react'

import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'

interface StepperContextValue {
  activeStep: number
  completedSteps: number[]
  skippedSteps: number[]
  totalSteps: number
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepperContext() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper.Step must be used within <Stepper>')
  }
  return context
}

type StepState = 'active' | 'completed' | 'skipped' | 'future'

function getStepState(
  index: number,
  activeStep: number,
  completedSteps: number[],
  skippedSteps: number[],
): StepState {
  if (completedSteps.includes(index)) return 'completed'
  if (skippedSteps.includes(index)) return 'skipped'
  if (index === activeStep) return 'active'
  return 'future'
}

const iconCircleStyles: Record<StepState, string> = {
  active: 'bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/25',
  completed: 'bg-emerald-600 text-white',
  skipped: 'bg-amber-500 text-white',
  future: 'bg-muted text-muted-foreground',
}

const labelStyles: Record<StepState, string> = {
  active: 'text-primary font-semibold',
  completed: 'text-emerald-600 font-medium',
  skipped: 'text-amber-500 font-medium',
  future: 'text-muted-foreground font-medium',
}

interface StepperProps {
  activeStep: number
  completedSteps?: number[]
  skippedSteps?: number[]
  children: React.ReactNode
}

function Stepper({
  activeStep,
  completedSteps = [],
  skippedSteps = [],
  children,
}: StepperProps) {
  const steps = React.Children.toArray(children)
  const totalSteps = steps.length

  return (
    <StepperContext.Provider value={{ activeStep, completedSteps, skippedSteps, totalSteps }}>
      <nav aria-label="Прогресс" className="w-full">
        <ol className="flex items-start">
          {steps.map((child, index) => (
            <li
              key={index}
              className={cn('flex items-start', index < totalSteps - 1 ? 'flex-1' : 'flex-none')}
            >
              <div className="flex flex-col items-center">
                {React.isValidElement<StepProps>(child) &&
                  React.cloneElement(child, { _index: index })}
              </div>

              {index < totalSteps - 1 && <Connector index={index} />}
            </li>
          ))}
        </ol>
      </nav>
    </StepperContext.Provider>
  )
}

function Connector({ index }: { index: number }) {
  const { completedSteps } = useStepperContext()
  const isFilled = completedSteps.includes(index)

  return (
    <div className="flex-1 flex items-center pt-5" aria-hidden>
      <div className="relative h-0.5 w-full mx-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full bg-emerald-600',
            'transition-all duration-500 ease-out',
            isFilled ? 'w-full' : 'w-0',
          )}
        />
      </div>
    </div>
  )
}

interface StepProps {
  icon: LucideIcon
  label: string
  _index?: number
}

function Step({ icon: Icon, label, _index = 0 }: StepProps) {
  const { activeStep, completedSteps, skippedSteps } = useStepperContext()
  const state = getStepState(_index, activeStep, completedSteps, skippedSteps)

  const StateIcon = state === 'completed' ? Check : state === 'skipped' ? SkipForward : Icon

  return (
    <>
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          'transition-all duration-300 ease-out',
          iconCircleStyles[state],
        )}
      >
        <StateIcon className="w-5 h-5" strokeWidth={state === 'completed' ? 2.5 : 2} />
      </div>
      <span
        className={cn(
          'hidden md:block text-xs mt-2 text-center max-w-20 leading-tight',
          'transition-colors duration-300',
          labelStyles[state],
        )}
      >
        {label}
      </span>
    </>
  )
}

Stepper.Step = Step

export default Stepper
