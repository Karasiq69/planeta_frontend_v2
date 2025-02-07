import {useCallback, useState} from 'react';
import debounce from 'debounce';
import {z} from 'zod';

const searchSchema = z.string().min(2, {message: 'Минимум 2 символа'});

const useDebouncedSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedHandleSearch = useCallback(
        debounce((value: string) => {
            const result = searchSchema.safeParse(value);
            if (result.success) {
                setSearchTerm(value);
                setSearchError('');
            } else {
                setSearchTerm('');
                setSearchError(result.error.issues[0].message);
            }
        }, 400),
        []
    );

    return {
        searchTerm,
        searchError,
        debouncedHandleSearch,
    };
};

export default useDebouncedSearch;