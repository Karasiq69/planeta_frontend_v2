'use client'
import {CircleCheck} from "lucide-react";
import MenuList from "@/components/common/navbar/MenuList";
import {useAuth} from "@/providers/AuthProvider";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useLogin, useLogout} from "@/hooks/use-auth";
import {toast} from "sonner";


const Navbar = () => {
    const {user, isLoading} = useAuth()
    const logout = useLogout()

    console.log(user)
    return (
        <nav className={'bg-secondary drop-shadow-md'}>
            <div className={'container mx-auto flex justify-between items-center h-20'}>
                <div id={'logo'}>
                    <p className={'font-black flex gap-2 items-center'}>
                        <CircleCheck/> TodoApp</p>
                </div>

                {/*<div id={'menu'}>*/}
                {/*    <MenuList/>*/}
                {/*</div>*/}


                {user ? <>
                    <div id={'user-profile'}>
                        <span className={'text-xs'}>
                            Привет, {user.email}
                        </span>

                        <Button variant={'link'} onClick={() => logout.mutate()}>
                            Выйти
                        </Button>

                    </div>

                </> : <>
                    <Button asChild variant={'link'}>
                        Войти
                    </Button>
                </>}

            </div>
        </nav>
    );
};
export default Navbar;
