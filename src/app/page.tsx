import Logo from '@/components/common/Logo'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <>
      <main
        className={`bg-[url('/img/MB-Pattern-612efe57.webp')] w-full bg-cover bg-center bg-no-repeat`}
      >
        <div className='flex h-svh flex-col items-center justify-center'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6  '>
            <div className='flex flex-col space-y-2 text-center items-center'>
              <Logo />
            </div>
            <div className="sm:w-[350px] mx-auto">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
