import { useQuery, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

export const useCharacterData = () => {
    const randomArray = [...Array(9)].map((_) => (Math.random() * 826) | 1);

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
        onError: (error) => {
            console.log(error);
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

export const useCharacterSearchData = (query) => {
    const {
        data: searchResult,
        isError: searchIsError,
        error: searchError,
        isFetching: searchIsFetching,
    } = useQuery({
        queryKey: ['search-result', query],
        queryFn: () =>
            axios.get(
                `https://rickandmortyapi.com/api/character/?name=${query}`
            ),
        select: (response) => {
            const results = response.data.results;
            return results.slice(0, Math.min(results.length, 9));
        },
        refetchOnWindowFocus: false,
        enabled: query.length >= 3,
        cacheTime: 0,
        retry: 3,
        onError: (error) => console.log(error),
    });

    return { searchResult, searchIsError, searchError, searchIsFetching };
};
