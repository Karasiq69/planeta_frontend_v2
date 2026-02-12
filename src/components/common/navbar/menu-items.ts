 import {ReactNode} from "react";

export interface NavbarMenuItem {
    url: string
    title: string
    icon?: ReactNode
}

export const menuItemsConfig: NavbarMenuItem[] = [
    {
        url: '/',
        title: 'Главная',
        icon: ''
    },
    {
        url: '/login',
        title: 'Войти',
        icon: ''
    },
    {
        url: '/register',
        title: 'Регистрация',
        icon: ''
    },
]