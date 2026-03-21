'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react'
import { toast } from 'sonner'

type StepNavigationProps = {
  currentStep: number
  skippable: boolean
  onNext: () => void
  onPrev: () => void
  onSkip: () => void
  isLastContentStep: boolean
  formId?: string
}

export function StepNavigation({
  currentStep,
  skippable,
  onNext,
  onPrev,
  onSkip,
  isLastContentStep,
  formId,
}: StepNavigationProps) {
  const handleSkip = () => {
    toast.info('Вы сможете настроить это позже')
    onSkip()
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        {currentStep > 0 && (
          <Button variant="ghost" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        {skippable && (
          <Button variant="outline" onClick={handleSkip}>
            <SkipForward className="mr-2 h-4 w-4" />
            Пропустить
          </Button>
        )}
        {formId ? (
          <Button type="submit" form={formId}>
            {isLastContentStep ? 'Завершить' : 'Далее'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onNext}>
            {isLastContentStep ? 'Завершить' : 'Далее'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
