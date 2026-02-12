'use client';
import * as React from 'react';
import {useImperativeHandle} from 'react';
import {cn} from '@/lib/utils';
import {CornerDownLeft} from "lucide-react";

interface UseAutosizeTextAreaProps {
    textAreaRef: HTMLTextAreaElement | null;
    minHeight?: number;
    maxHeight?: number;
    triggerAutoSize: string;
}

export const useAutosizeTextArea = ({
                                        textAreaRef,
                                        triggerAutoSize,
                                        maxHeight = Number.MAX_SAFE_INTEGER,
                                        minHeight = 0,
                                    }: UseAutosizeTextAreaProps) => {
    const [init, setInit] = React.useState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        const offsetBorder = 2;
        if (textAreaRef) {
            if (init) {
                textAreaRef.style.minHeight = `${minHeight + offsetBorder}px`;
                if (maxHeight > minHeight) {
                    textAreaRef.style.maxHeight = `${maxHeight}px`;
                }
                setInit(false);
            }
            textAreaRef.style.height = `${minHeight + offsetBorder}px`;
            const scrollHeight = textAreaRef.scrollHeight;
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            if (scrollHeight > maxHeight) {
                textAreaRef.style.height = `${maxHeight}px`;
            } else {
                textAreaRef.style.height = `${scrollHeight + offsetBorder}px`;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textAreaRef, triggerAutoSize]);
};

export type AutosizeTextAreaRef = {
    textArea: HTMLTextAreaElement;
    maxHeight: number;
    minHeight: number;
};

type AutosizeTextAreaProps = {
    maxHeight?: number;
    minHeight?: number;
    iconComponent?: React.ReactNode;
    keyboardText?: string;

} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<AutosizeTextAreaRef, AutosizeTextAreaProps>(
    (
        {
            maxHeight = Number.MAX_SAFE_INTEGER,
            minHeight = 52,
            iconComponent = <CornerDownLeft
                className="h-3 w-3 text-gray-400"/>,
            keyboardText = "",
            className,
            onChange,
            value,
            ...props
        }: AutosizeTextAreaProps,
        ref: React.Ref<AutosizeTextAreaRef>,
    ) => {
        const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
        const [triggerAutoSize, setTriggerAutoSize] = React.useState('');

        useAutosizeTextArea({
            textAreaRef: textAreaRef.current,
            triggerAutoSize: triggerAutoSize,
            maxHeight,
            minHeight,
        });

        useImperativeHandle(ref, () => ({
            textArea: textAreaRef.current as HTMLTextAreaElement,
            focus: () => textAreaRef.current?.focus(),
            maxHeight,
            minHeight,
        }));

        React.useEffect(() => {
            setTriggerAutoSize(value as string);
        }, [props?.defaultValue, value]);

        return (
            <div className="relative w-full">
                <textarea
                    {...props}
                    value={value}
                    ref={textAreaRef}
                    className={cn(
                        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                    )}
                    onChange={(e) => {
                        setTriggerAutoSize(e.target.value);
                        onChange?.(e);
                    }}
                />
                <div className="absolute top-2 right-0 flex items-center pr-3 pointer-events-none">
                    <kbd
                        className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        {keyboardText || iconComponent}
                    </kbd>
                </div>
            </div>
        );
    },
);
AutosizeTextarea.displayName = 'AutosizeTextarea';
