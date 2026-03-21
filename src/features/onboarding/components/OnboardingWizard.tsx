'use client'

import { useEffect } from 'react'
import { Building2, Users, Wrench, Warehouse, Clock, PartyPopper } from 'lucide-react'
import Stepper from '@/components/common/Stepper'
import { useOnboarding } from '../hooks/useOnboarding'
import { ONBOARDING_STEPS } from '../types'
import { StepNavigation } from './StepNavigation'
import { OrganizationStep } from './steps/OrganizationStep'
import { EmployeesStep } from './steps/EmployeesStep'
import { ServicesStep } from './steps/ServicesStep'
import { WarehouseStep } from './steps/WarehouseStep'
import { ScheduleStep } from './steps/ScheduleStep'
import { CompletionStep } from './steps/CompletionStep'

const STEP_ICONS = [Building2, Users, Wrench, Warehouse, Clock, PartyPopper]

const stepHasForm = (step: number) => [0, 3].includes(step)

export function OnboardingWizard() {
  const onboarding = useOnboarding()
  const { currentStep, completedSteps, skippedSteps } = onboarding

  useEffect(() => {
    if (currentStep === 5) {
      onboarding.complete()
    }
  }, [currentStep])

  return (
    <div className="mx-auto w-full max-w-6xl px-8 py-8 pt-20">
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
        {currentStep === 0 && (
          <OrganizationStep
            defaultValues={onboarding.data.organization}
            onSubmit={(data) => { onboarding.setStepData(0, data); onboarding.nextStep() }}
          />
        )}
        {currentStep === 1 && (
          <EmployeesStep
            defaultValues={onboarding.data.employees}
            onSave={(data) => onboarding.setStepData(1, data)}
          />
        )}
        {currentStep === 2 && (
          <ServicesStep
            defaultValues={onboarding.data.services}
            onSave={(data) => onboarding.setStepData(2, data)}
          />
        )}
        {currentStep === 3 && (
          <WarehouseStep
            defaultValues={onboarding.data.warehouse}
            onSubmit={(data) => { onboarding.setStepData(3, data); onboarding.nextStep() }}
          />
        )}
        {currentStep === 4 && (
          <ScheduleStep
            defaultValues={onboarding.data.schedule}
            onSave={(data) => onboarding.setStepData(4, data)}
          />
        )}
        {currentStep === 5 && (
          <CompletionStep
            completedSteps={completedSteps}
            skippedSteps={skippedSteps}
          />
        )}
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
