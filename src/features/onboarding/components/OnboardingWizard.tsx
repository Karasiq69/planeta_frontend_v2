'use client'

import { Building2, Users, Wrench, Warehouse, Clock, PartyPopper } from 'lucide-react'
import Stepper from '@/components/common/Stepper'
import { useOnboarding } from '../hooks/useOnboarding'
import { ONBOARDING_STEPS } from '../types'
import { StepNavigation } from './StepNavigation'

const STEP_ICONS = [Building2, Users, Wrench, Warehouse, Clock, PartyPopper]

const stepHasForm = (step: number) => [0, 3].includes(step)

export function OnboardingWizard() {
  const onboarding = useOnboarding()
  const { currentStep, completedSteps, skippedSteps } = onboarding

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pt-20">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Настройка системы</h1>
        <p className="text-muted-foreground mt-1">Заполните основные данные для начала работы</p>
      </div>

      <Stepper activeStep={currentStep} completedSteps={completedSteps} skippedSteps={skippedSteps}>
        {ONBOARDING_STEPS.map((step, i) => (
          <Stepper.Step key={i} icon={STEP_ICONS[i]} label={step.label} />
        ))}
      </Stepper>

      <div className="mt-8">
        {/* Step content rendered here — placeholder until steps built */}
        <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
          Шаг {currentStep + 1}: {ONBOARDING_STEPS[currentStep].label}
        </div>
      </div>

      {currentStep < 5 && (
        <StepNavigation
          currentStep={currentStep}
          skippable={ONBOARDING_STEPS[currentStep].skippable}
          onNext={onboarding.nextStep}
          onPrev={onboarding.prevStep}
          onSkip={onboarding.skipStep}
          isLastContentStep={currentStep === 4}
          formId={stepHasForm(currentStep) ? `step-${currentStep}-form` : undefined}
        />
      )}
    </div>
  )
}
