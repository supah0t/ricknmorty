import { useState, useEffect } from 'react';

import {
    useCharacterData,
    useCharacterSearchData,
} from '../hooks/useCharacters';
import Ribbon from './ribbon';
import CharacterCard from './characterCard';

import styles from './container.module.css';

const Container = () => {
    const [content, setContent] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [searchContent, setSearchContent] = useState('');

    const { characters, isError, error, refetch, isFetching } =
        useCharacterData();

    const { searchResult, searchIsError, searchError, searchIsFetching } =
        useCharacterSearchData(searchContent);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cards')) || [];
        setContent(items);
    }, []);

    const buttonClick = () => {
        refetch();
        setDisabled(true);
        setTimeout(() => setDisabled(false), 3000);
    };

    const handleChange = ({ target: { value } }) => {
        setSearchContent(value);
        if (value.length === 0) refetch();
    };

    return (
        <div>
            <div className={styles['ribbon-area']}>
                <Ribbon content={content} setContent={setContent} />
                <button
                    className={styles['refresh-button']}
                    onClick={() => buttonClick()}
                    disabled={disabled}
                >
                    {!disabled ? 'Shuffle' : 'Wait...'}
                </button>
            </div>
            <input
                className={styles['searchbar']}
                placeholder="Search..."
                value={searchContent}
                onChange={(e) => handleChange(e)}
            />
            {searchContent.length < 3 ? (
                <RenderCharacters
                    content={content}
                    setContent={setContent}
                    characters={characters}
                    isError={isError}
                    error={error}
                    isFetching={isFetching}
                />
            ) : (
                <RenderCharacters
                    content={content}
                    setContent={setContent}
                    characters={searchResult}
                    isError={searchIsError}
                    error={searchError}
                    isFetching={searchIsFetching}
                />
            )}
        </div>
    );
};

const RenderCharacters = ({
    content,
    setContent,
    characters,
    isError,
    error,
    isFetching,
}) => {
    return (
        <>
            {isFetching ? (
                <div className={styles['information-message']}>Fetching...</div>
            ) : isError ? (
                <div className={styles['information-message']}>
                    Error: {error.response.data.error}
                </div>
            ) : (
                <div className={styles.container}>
                    {characters &&
                        characters.map((character) => (
                            <CharacterCard
                                content={content}
                                key={character.id}
                                name={character.name}
                                id={character.id}
                                status={character.status}
                                species={character.species}
                                origin={character.origin}
                                location={character.location}
                                image={character.image}
                                gender={character.gender}
                                episodeList={character.episode}
                                setContent={setContent}
                            />
                        ))}
                </div>
            )}
        </>
    );
};

export default Container;
