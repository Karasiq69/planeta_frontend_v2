import {Metadata} from 'next';
import {LoginForm} from '@/components/login-form';

export const metadata: Metadata = {
  title: 'TodoApp',
  description: 'App with NextJS.',
};

export default function AuthenticationPage() {
  return (
      <>
        <div className="flex h-svh   flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6  ">
            <div className="flex flex-col space-y-2 text-center">

              <h1 className="text-2xl font-semibold tracking-tight">
                Добро пожаловать
              </h1>
            </div>
            <div className={'sm:w-[350px] mx-auto'}>
              <LoginForm/>
            </div>

          </div>
        </div>
      </>
  );
}