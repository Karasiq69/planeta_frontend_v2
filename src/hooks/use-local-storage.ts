import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    // При первом рендере на сервере и клиенте используем initialValue
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Флаг для отслеживания, находимся ли мы на клиенте
    const [isMounted, setIsMounted] = useState(false);

    // После монтирования компонента загружаем значение из localStorage
    useEffect(() => {
        setIsMounted(true);

        // Функция для получения значения из localStorage
        const getValueFromStorage = () => {
            try {
                const item = window.localStorage.getItem(key);
                // Если значение найдено, парсим его, иначе используем initialValue
                return item ? JSON.parse(item) as T : initialValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return initialValue;
            }
        };

        // Загружаем значение из localStorage
        const valueFromStorage = getValueFromStorage();
        setStoredValue(valueFromStorage);
        // Этот эффект запускается только при монтировании
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Сохраняем значение в localStorage, когда оно изменяется
    useEffect(() => {
        // Сохраняем в localStorage только на клиенте и после монтирования
        if (!isMounted) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [key, storedValue, isMounted]);

    // Возвращаем текущее значение и функцию для его обновления
    return [storedValue, setStoredValue];
}