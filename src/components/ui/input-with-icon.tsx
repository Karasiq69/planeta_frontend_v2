import React from 'react';
import {Input, InputProps} from "@/components/ui/input";
import {CornerDownLeft} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

interface InputWithIconProps extends InputProps {
    iconComponent?: React.ReactNode;
    keyboardText?: string;
    variant?: 'input' | 'textarea';
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
                                                         iconComponent = <CornerDownLeft
                                                             className="h-4 w-4 text-gray-400"/>,
                                                         keyboardText = "",
                                                         className = "",
                                                         variant = 'input',
                                                         ...props
                                                     }) => {
    const InputElement =
        variant === 'input' ? Input :
            variant === 'textarea' ? Textarea : Input

    return (
        <div className="relative w-full">
            <InputElement
                className={`pr-10 ${className}`}

                // @ts-expect-error fix dis later
                {...props as never}
            />
            <div className="absolute top-[20%] right-0 flex items-center pr-3 pointer-events-none">
                <kbd
                    className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {keyboardText || iconComponent}
                </kbd>
            </div>
        </div>
    );
};

export default InputWithIcon;