import { KeyboardEvent, useCallback } from 'react';

type KeyHandler = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

interface UseKeyPressOptions {
    targetKey: string;
    shouldPreventDefault?: boolean;
    withoutShift?: boolean;
}

export function useKeyDown(
    onKeyPress: KeyHandler,
    { targetKey, shouldPreventDefault = true, withoutShift = true }: UseKeyPressOptions
): KeyHandler {
    return useCallback(
        (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (e.key === targetKey && (!withoutShift || !e.shiftKey)) {
                if (shouldPreventDefault) {
                    e.preventDefault();
                }
                onKeyPress(e);
            }
        },
        [onKeyPress, targetKey, shouldPreventDefault, withoutShift]
    );
}