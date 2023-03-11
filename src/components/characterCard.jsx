import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

import { removeCharacter } from '../hooks/useCharacters';
import Modal from './modal';

import styles from './characterCard.module.css';

const CharacterCard = ({
    image,
    id,
    name,
    status,
    location,
    species,
    origin,
    gender,
    episodeList,
    setContent,
    content,
}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowModal(false);
        };

        if (showModal) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [showModal]);

    const [, drag] = useDrag(() => ({
        type: 'box',
        item: { name, image, id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                addToLocal(item);
                setContent((current) => [...current, item]);
                removeCharacter(id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));

    const addToLocal = (item) => {
        const items = JSON.parse(localStorage.getItem('cards')) || [];
        localStorage.setItem('cards', JSON.stringify([...items, item]));
    };

    const handleOverlayClick = (e) => {
        if (showModal) {
            e.stopPropagation();
            setShowModal(false);
        }
    };

    return (
        <div
            ref={
                content.length < 8 && !content.find((item) => item.id === id)
                    ? drag
                    : null
            }
            className={styles['character-card']}
        >
            {showModal && (
                <span>
                    <div
                        className={styles['overlay']}
                        onClick={(e) => handleOverlayClick(e)}
                    ></div>
                    <Modal
                        setShowModal={setShowModal}
                        name={name}
                        status={status}
                        location={location}
                        species={species}
                        origin={origin}
                        gender={gender}
                        episodeList={episodeList}
                        image={image}
                    />
                </span>
            )}

            <div className={styles['image-container']}>
                <img
                    className={styles['character-image']}
                    src={image}
                    alt="Character Image"
                />
            </div>
            <div className={styles['character-info']}>
                <span
                    onClick={() => setShowModal(true)}
                    className={styles['character-name']}
                >
                    {name}
                </span>
                <span className={styles['character-status']}>
                    <span
                        className={`${styles['dot']} ${
                            status === 'Alive'
                                ? styles['green']
                                : status === 'Dead'
                                ? styles['red']
                                : styles['grey']
                        }`}
                    />
                    {status} - {species}
                </span>
                <span className={styles['character-origin']}>
                    <span style={{ color: 'rgb(158, 158, 158)' }}>
                        Origin:{' '}
                    </span>
                    {origin.name}
                </span>
                <span className={styles['character-location']}>
                    <span style={{ color: 'rgb(158, 158, 158)' }}>
                        Currently:{' '}
                    </span>
                    {location.name}
                </span>
            </div>
        </div>
    );
};

export default CharacterCard;
