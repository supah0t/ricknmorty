import { useQuery, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

export const useCharacterData = () => {
    const randomArray = [...Array(9)].map(
        (_) => (Math.random() * 826) | (0 + 1)
    );

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

export const removeCharacter = (id) => {
    const prev = queryClient.getQueryData(['random-characters']).data;
    const updated = prev.filter((obj) => {
        return obj.id !== id;
    });
    const newData = { data: updated };
    queryClient.setQueryData(['random-characters'], newData);
};
