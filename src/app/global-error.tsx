'use client'

import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang='ru'>
      <body className='h-screen overflow-hidden antialiased bg-[oklch(0.9818_0.0054_95.0986)]'>
        <div className='flex h-full w-full items-center justify-center px-4'>
          <div className='flex flex-col items-center gap-6 max-w-sm text-center'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-full blur-2xl scale-[2]' style={{ background: 'oklch(0.58 0.16 25 / 0.05)' }} />
              <div
                className='relative flex items-center justify-center rounded-2xl'
                style={{
                  width: '5rem',
                  height: '5rem',
                  background: 'oklch(0.58 0.16 25 / 0.08)',
                  border: '1px solid oklch(0.58 0.16 25 / 0.15)',
                }}
              >
                <AlertTriangle size={36} strokeWidth={1.5} style={{ color: 'oklch(0.58 0.16 25 / 0.6)' }} />
              </div>
            </div>

            <div className='space-y-2'>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.6059 0.0075 97.4233 / 0.6)' }}>
                критическая ошибка
              </p>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.025em', color: 'oklch(0.3438 0.0269 95.7226)' }}>
                Приложение не может продолжить работу
              </h1>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.625, color: 'oklch(0.6059 0.0075 97.4233 / 0.8)' }}>
                {error.message || 'Произошла критическая ошибка. Попробуйте обновить страницу.'}
              </p>
              {error.digest && (
                <p style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'oklch(0.6059 0.0075 97.4233 / 0.5)' }}>
                  Код: {error.digest}
                </p>
              )}
            </div>

            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'white',
                background: 'oklch(0.6171 0.1375 39.0427)',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={16} />
              Обновить страницу
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
