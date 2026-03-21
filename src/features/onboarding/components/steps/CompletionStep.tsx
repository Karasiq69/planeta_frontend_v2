'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PartyPopper, Check, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ONBOARDING_STEPS } from '../../types'

type Props = {
  completedSteps: number[]
  skippedSteps: number[]
}

const CONFETTI_COLORS = [
  'bg-emerald-400', 'bg-amber-400', 'bg-primary', 'bg-rose-400',
  'bg-violet-400', 'bg-sky-400', 'bg-orange-400', 'bg-pink-400',
]

const SETTINGS_LINKS: Record<number, string> = {
  1: '/settings/employees',
  2: '/settings/services',
  3: '/settings/general',
  4: '/settings/general',
}

export function CompletionStep({ completedSteps, skippedSteps }: Props) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const steps = ONBOARDING_STEPS.slice(0, 5) // exclude "Готово" step itself

  return (
    <div className="relative overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 -top-10 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-sm ${CONFETTI_COLORS[i % CONFETTI_COLORS.length]} animate-confetti-fall`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="relative">
        <CardContent className="pt-8 pb-8">
          {/* Celebration header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse-glow">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-emerald-600 to-primary bg-clip-text text-transparent">
              Всё готово!
            </h2>
            <p className="text-muted-foreground mt-2">
              Ваша система настроена и готова к работе
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-3 max-w-md mx-auto mb-8">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isSkipped = skippedSteps.includes(index)

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s`, opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                    )}
                    <span className={isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                      {step.label}
                    </span>
                  </div>
                  {isSkipped && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary text-xs h-7"
                      onClick={() => router.push(SETTINGS_LINKS[index] ?? '/settings')}
                    >
                      Настроить
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
            <Button size="lg" onClick={() => router.push('/dashboard')} className="px-8">
              Перейти в CRM
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
