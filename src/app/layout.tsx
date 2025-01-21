import type {Metadata} from "next";
import "./globals.css";
import {RootProvider} from "@/providers/RootProvider";
import {Toaster} from "@/components/ui/sonner";


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

        <html lang="en">
        <body>
        <RootProvider>
            {children}
        </RootProvider>
        <Toaster richColors={true}/>
        </body>
        </html>
    );
}
