import { useState, useEffect } from 'react';

import { useCharacterData } from '../hooks/useCharacters';
import Ribbon from './ribbon';
import CharacterCard from './characterCard';
import Searchbar from './searchbar';

import styles from './container.module.css';

const Container = () => {
    const [content, setContent] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const { characters, isError, error, refetch, isFetching } =
        useCharacterData();

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cards')) || [];
        setContent(items);
    }, []);

    const buttonClick = () => {
        refetch();
        setDisabled(true);
        setTimeout(() => setDisabled(false), 3000);
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
            <Searchbar />
            {isFetching ? (
                <div style={{ color: 'white', textAlign: 'center' }}>
                    Shuffling...
                </div>
            ) : isError ? (
                <span>Error: {error}</span>
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
        </div>
    );
};

export default Container;
