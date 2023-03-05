import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCharacterData = () => {
    const randomArray = [...Array(9)].map((_) => (Math.random() * 826) | 0);

    const {
        data: characters,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['random-characters'],
        queryFn: () =>
            axios.get(
                `https://rickandmortyapi.com/api/character/${[...randomArray]}`
            ),
        select: (response) => response.data,
        refetchOnWindowFocus: false,
        cacheTime: Infinity,
        onError: () => {
            console.log('error');
        },
    });

    return { characters, isError, error, refetch, isFetching };
};
