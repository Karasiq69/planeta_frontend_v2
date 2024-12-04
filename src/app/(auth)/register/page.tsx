import {Metadata} from 'next';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {SignUpForm} from "@/components/signup-form";

export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'Регистрация нового аккаунта',
};

export default function RegisterPage() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    buttonVariants({variant: 'ghost'}),
                    'absolute left-4 top-4 md:left-8 md:top-8'
                )}
            >
                Назад
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Добро пожаловать
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Введите email для регистрации аккаунта
                    </p>
                </div>
                <div className={'sm:w-[350px] mx-auto'}>
                    <SignUpForm/>
                </div>

            </div>
        </div>
    );
}