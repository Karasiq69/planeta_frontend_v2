import {ReactNode} from "react";
import {ThemeProvider} from "@/providers/theme-provider";

export default function RootProvider({ children }: { children: ReactNode }) {

    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}