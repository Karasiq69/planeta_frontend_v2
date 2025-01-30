import type {Metadata} from "next";
import "./globals.css";
import {RootProvider} from "@/providers/RootProvider";
import {Toaster} from "@/components/ui/sonner";
import {Inter, Roboto} from 'next/font/google'
import localFont from 'next/font/local'

// const font = Roboto({
//     weight: ['300', '400',  '700', '900'],
//     subsets: ['latin', "cyrillic-ext"]
// })

export const metadata: Metadata = {
    title: "Вход | CRM Планета Мерседес",
    description: "",
};
// const font = localFont({
//     src: [
//         {
//             path: '../../public/fonts/Involve-bold.ttf',
//             weight: '400',
//             style: 'normal',
//         },
//         {
//             path: '../../public/fonts/Involve-Medium.ttf',
//             weight: '500',
//             style: 'normal',
//         },
//         {
//             path: '../../public/fonts/Involve-SemiBold.ttf',
//             weight: '600',
//             style: 'normal',
//         },
//         {
//             path: '../../public/fonts/Involve-Bold.ttf',
//             weight: '700',
//             style: 'normal',
//         },
//         {
//             path: '../../public/fonts/Involve-Oblique.ttf',
//             weight: '400',
//             style: 'italic',
//         },
//         {
//             path: '../../public/fonts/Involve-MediumOblique.ttf',
//             weight: '500',
//             style: 'italic',
//         },
//         {
//             path: '../../public/fonts/Involve-SemiBoldOblique.ttf',
//             weight: '600',
//             style: 'italic',
//         },
//         {
//             path: '../../public/fonts/Involve-BoldOblique.ttf',
//             weight: '700',
//             style: 'italic',
//         },
//     ],
//     variable: '--font-involve', // Создаем CSS переменную для использования шрифта
// })

export default function AppLayout({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="ru">
        <body>
        <RootProvider>
            {children}
        </RootProvider>
        <Toaster richColors={true}/>
        </body>
        </html>
    );
}
