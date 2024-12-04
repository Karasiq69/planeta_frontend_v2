'use client';

import Link from 'next/link';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useSignUpWithAuth} from '@/hooks/use-auth';

const formSchema = z.object({
    email: z.string().email({
        message: 'Пожалуйста, введите корректный email адрес.',
    }),
    password: z.string().min(6, {
        message: 'Пароль должен содержать минимум 6 символов.',
    }),
    re_password: z.string().min(6, {
        message: 'Пароль должен содержать минимум 6 символов.',
    }),
}).refine((data) => data.password === data.re_password, {
    message: "Пароли не совпадают",
    path: ["re_password"],
});

export function SignUpForm() {
    const { signUpAndLogin, isLoading } = useSignUpWithAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            re_password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await signUpAndLogin(values);
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
        }
    }

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
                <CardDescription className="text-lg">
                    Создайте аккаунт, чтобы начать
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} className="h-11"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="h-11"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="re_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Подтвердите пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="h-11"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full h-11 text-lg">
                            Зарегистрироваться
                        </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    Уже есть аккаунт?{' '}
                    <Link href="/" className="underline  ">
                        Войти
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}