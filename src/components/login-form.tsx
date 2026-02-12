'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useLogin } from '@/hooks/use-auth'

const formSchema = z.object({
  email: z.string().email({
    message: 'Пожалуйста, введите корректный email адрес.',
  }),
  password: z.string().min(6, {
    message: 'Пароль должен содержать минимум 6 символов.',
  }),
})

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutate(values)
  }

  return (
    <Card className=' '>
      <CardHeader>
        <CardTitle className='text-2xl'>Вход</CardTitle>
        <CardDescription>Введите ваш email для входа в аккаунт</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@mail.ru' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel>Пароль</FormLabel>
                    {/*<Link*/}
                    {/*    href="#"*/}
                    {/*    className="ml-auto inline-block text-sm underline"*/}
                    {/*>*/}
                    {/*    Забыли пароль?*/}
                    {/*</Link>*/}
                  </div>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit' className='w-full'>
              Войти
            </Button>
          </form>
        </Form>
        {/*<div className="mt-4 text-center text-sm">*/}
        {/*    Нет аккаунта?{' '}*/}
        {/*    <Link href="/register" className="underline">*/}
        {/*        Зарегистрироваться*/}
        {/*    </Link>*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  )
}
