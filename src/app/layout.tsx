import type {Metadata} from "next";
import "./globals.css";
import RootProvider from "@/providers/RootProvider";
import {Toaster} from "sonner";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`antialiased`}
        >
        <RootProvider>
            {children}

        </RootProvider>                                <Toaster richColors={true} />

        </body>
        </html>
    );
}
