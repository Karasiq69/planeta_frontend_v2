'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSaveEmailSettings, useTestEmail } from '@/features/email/api/mutations'
import { useEmailSettings } from '@/features/email/api/queries'

const smtpSchema = z.object({
  host: z.string().min(1, 'Укажите хост'),
  port: z.coerce.number().int().min(1).max(65535),
  secure: z.boolean(),
  user: z.string().min(1, 'Укажите пользователя'),
  password: z.string().min(1, 'Укажите пароль'),
  fromName: z.string().min(1, 'Укажите имя отправителя'),
  fromEmail: z.string().email('Некорректный email'),
  isActive: z.boolean(),
})

type SmtpFormValues = z.infer<typeof smtpSchema>

export default function SmtpSettingsForm() {
  const { data: settings, isLoading, isError } = useEmailSettings()
  const isUpdate = !!settings && !isError
  const saveMutation = useSaveEmailSettings(isUpdate)
  const testMutation = useTestEmail()
  const [testEmail, setTestEmail] = useState('')

  const form = useForm<SmtpFormValues>({
    resolver: zodResolver(smtpSchema),
    values: settings
      ? {
          host: settings.host,
          port: settings.port,
          secure: settings.secure,
          user: settings.user,
          password: '',
          fromName: settings.fromName,
          fromEmail: settings.fromEmail,
          isActive: settings.isActive,
        }
      : {
          host: '',
          port: 587,
          secure: true,
          user: '',
          password: '',
          fromName: '',
          fromEmail: '',
          isActive: true,
        },
  })

  const onSubmit = (values: SmtpFormValues) => {
    saveMutation.mutate(values)
  }

  const handleTestEmail = () => {
    if (!testEmail) return
    testMutation.mutate(testEmail)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Настройки SMTP</CardTitle>
          <CardDescription>
            Настройте подключение к почтовому серверу для отправки писем клиентам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="host">SMTP хост</Label>
                <Input id="host" placeholder="smtp.gmail.com" {...form.register('host')} />
                {form.formState.errors.host && (
                  <p className="text-sm text-destructive">{form.formState.errors.host.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="port">Порт</Label>
                <Input id="port" type="number" placeholder="587" {...form.register('port')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="user">Пользователь</Label>
                <Input id="user" placeholder="user@example.com" {...form.register('user')} />
                {form.formState.errors.user && (
                  <p className="text-sm text-destructive">{form.formState.errors.user.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isUpdate ? '••••••••' : ''}
                  {...form.register('password')}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fromName">Имя отправителя</Label>
                <Input
                  id="fromName"
                  placeholder="Планета Мерседес"
                  {...form.register('fromName')}
                />
                {form.formState.errors.fromName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fromName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fromEmail">Email отправителя</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  placeholder="noreply@example.com"
                  {...form.register('fromEmail')}
                />
                {form.formState.errors.fromEmail && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.fromEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="secure"
                  checked={form.watch('secure')}
                  onCheckedChange={(checked) => form.setValue('secure', checked === true)}
                />
                <Label htmlFor="secure" className="cursor-pointer">
                  SSL/TLS
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={form.watch('isActive')}
                  onCheckedChange={(checked) => form.setValue('isActive', checked === true)}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Активно
                </Label>
              </div>
            </div>

            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isUpdate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Тестовое письмо</CardTitle>
            <CardDescription>
              Отправьте тестовое письмо для проверки настроек
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="email@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="max-w-sm"
              />
              <Button
                variant="outline"
                disabled={!testEmail || testMutation.isPending}
                onClick={handleTestEmail}
              >
                {testMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                Отправить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
