'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAcceptInvite } from '@/features/invite/api/mutations'
import { useValidateInvite } from '@/features/invite/api/queries'

const formSchema = z
  .object({
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof formSchema>

interface Props {
  token: string
}

export default function AcceptInvitePage({ token }: Props) {
  const router = useRouter()
  const { data: inviteInfo, isLoading, error } = useValidateInvite(token)
  const acceptMutation = useAcceptInvite(token)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  function onSubmit(values: FormValues) {
    acceptMutation.mutate(
      { password: values.password },
      { onSuccess: () => router.replace('/dashboard') },
    )
  }

  if (isLoading) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    const apiError = error as { response?: { data?: { reason?: string } } }
    const reason = apiError.response?.data?.reason || 'not_found'

    const messages: Record<string, string> = {
      expired: 'Ссылка устарела. Обратитесь к администратору для получения новой.',
      used: 'Эта ссылка уже была использована.',
      revoked: 'Ссылка недействительна. Обратитесь к администратору.',
      not_found: 'Ссылка не найдена.',
    }

    return (
      <main className='flex h-svh flex-col items-center justify-center'>
        <div className='flex flex-col items-center space-y-6'>
          <Logo />
          <Card className='w-[400px]'>
            <CardHeader>
              <CardTitle className='text-xl'>Ссылка недействительна</CardTitle>
              <CardDescription>{messages[reason] || messages.not_found}</CardDescription>
            </CardHeader>
            <CardContent>
              {reason === 'used' && (
                <Button variant='outline' className='w-full' onClick={() => router.push('/')}>
                  Перейти к входу
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className='flex h-svh flex-col items-center justify-center'>
      <div className='flex flex-col items-center space-y-6'>
        <Logo />
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-xl'>
              Добро пожаловать в {inviteInfo?.organizationName}
            </CardTitle>
            <CardDescription>Придумайте пароль для входа в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Повторите пароль</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={acceptMutation.isPending} type='submit' className='w-full'>
                  {acceptMutation.isPending ? 'Активация...' : 'Начать работу'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
