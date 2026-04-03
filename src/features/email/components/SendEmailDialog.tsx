'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Paperclip, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSendEmail } from '@/features/email/api/mutations'
import { useTemplates } from '@/features/document-templates/api/queries'

import type { EmailAttachment } from '@/features/email/types'

const sendEmailSchema = z.object({
  recipientEmail: z.string().email('Некорректный email'),
  subject: z.string().min(1, 'Укажите тему'),
  body: z.string().min(1, 'Укажите текст письма'),
})

type SendEmailFormValues = z.infer<typeof sendEmailSchema>

interface SendEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipientEmail?: string
  orderId?: number
  clientId?: number
}

export default function SendEmailDialog({
  open,
  onOpenChange,
  recipientEmail = '',
  orderId,
  clientId,
}: SendEmailDialogProps) {
  const sendMutation = useSendEmail()
  const { data: templates = [] } = useTemplates()
  const [attachments, setAttachments] = useState<EmailAttachment[]>([])

  const form = useForm<SendEmailFormValues>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      recipientEmail,
      subject: '',
      body: '',
    },
  })

  const entityType = orderId ? 'order' : clientId ? 'client' : undefined
  const entityId = orderId ?? clientId

  const addAttachment = (templateSlug: string) => {
    if (!entityType || !entityId) return
    if (attachments.some((a) => a.templateSlug === templateSlug)) return
    setAttachments((prev) => [...prev, { templateSlug, entityType, entityId }])
  }

  const removeAttachment = (templateSlug: string) => {
    setAttachments((prev) => prev.filter((a) => a.templateSlug !== templateSlug))
  }

  const onSubmit = (values: SendEmailFormValues) => {
    sendMutation.mutate(
      {
        ...values,
        orderId,
        clientId,
        attachments: attachments.length > 0 ? attachments : undefined,
      },
      {
        onSuccess: () => {
          form.reset()
          setAttachments([])
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Отправить письмо</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="recipientEmail">Email получателя</Label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="client@example.com"
              {...form.register('recipientEmail')}
            />
            {form.formState.errors.recipientEmail && (
              <p className="text-sm text-destructive">
                {form.formState.errors.recipientEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">Тема</Label>
            <Input id="subject" placeholder="Тема письма" {...form.register('subject')} />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="body">Текст</Label>
            <Textarea
              id="body"
              placeholder="Текст письма..."
              rows={5}
              {...form.register('body')}
            />
            {form.formState.errors.body && (
              <p className="text-sm text-destructive">{form.formState.errors.body.message}</p>
            )}
          </div>

          {entityType && entityId && templates.length > 0 && (
            <div className="space-y-1.5">
              <Label>Вложения (шаблоны)</Label>
              <Select onValueChange={addAttachment}>
                <SelectTrigger>
                  <SelectValue placeholder="Добавить вложение из шаблона" />
                </SelectTrigger>
                <SelectContent>
                  {templates
                    .filter((t) => t.isActive)
                    .map((t) => (
                      <SelectItem key={t.slug} value={t.slug}>
                        {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {attachments.map((a) => {
                    const template = templates.find((t) => t.slug === a.templateSlug)
                    return (
                      <span
                        key={a.templateSlug}
                        className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
                      >
                        <Paperclip className="size-3" />
                        {template?.name ?? a.templateSlug}
                        <button
                          type="button"
                          onClick={() => removeAttachment(a.templateSlug)}
                          className="ml-0.5 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={sendMutation.isPending}>
              {sendMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                'Отправить'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
