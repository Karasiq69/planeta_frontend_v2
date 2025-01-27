import type {Metadata} from "next";
import "./globals.css";
import {RootProvider} from "@/providers/RootProvider";
import {Toaster} from "@/components/ui/sonner";
import {Inter} from 'next/font/google'

const font = Inter({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin', "cyrillic-ext"]
})

export const metadata: Metadata = {
    title: "Вход | CRM Планета Мерседес",
    description: "",
};

export default function AppLayout({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en" className={font.className}>
        <body>
        <RootProvider>
            {children}
        </RootProvider>
        <Toaster richColors={true}/>
        </body>
        </html>
    );
}
