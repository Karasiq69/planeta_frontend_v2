export const formatRelativeTime = (input: string): string => {
    const utcDate = new Date(input);
    const moscowDate = new Date(utcDate.getTime() - 3 * 3600 * 1000); // TODO fix dates (utc now moscow time)
    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const dateFormatter = new Intl.DateTimeFormat('ru-RU');

    const diffMinutes = Math.floor((now.getTime() - moscowDate.getTime()) / 60000);
    const isToday = (date: Date) => date.toDateString() === now.toDateString();
    const isYesterday = (date: Date) => {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
    };

    const getMinutesText = (minutes: number): string => {
        const lastDigit = minutes % 10;
        const lastTwoDigits = minutes % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'минут';
        }

        if (lastDigit === 1) {
            return 'минуту';
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'минуты';
        }

        return 'минут';
    };

    if (isToday(moscowDate)) {
        if (diffMinutes < 1) return 'только что';
        if (diffMinutes < 60) return `${diffMinutes} ${getMinutesText(diffMinutes)} назад`;
        return `сегодня в ${timeFormatter.format(moscowDate)}`;
    }

    if (isYesterday(moscowDate)) return `вчера в ${timeFormatter.format(moscowDate)}`;

    return `${dateFormatter.format(moscowDate)} в ${timeFormatter.format(moscowDate)}`;
};


// Функция для форматирования времени в формате ЧЧ:ММ
export const getTimeFromDate = (date: Date | null): string => {
    if (date == null) return ''
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};