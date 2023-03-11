import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import CreateModal from './createModal';

import styles from './ribbon.module.css';

const Ribbon = ({ content = [], setContent }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowCreateModal(false);
        };

        if (showCreateModal) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [showCreateModal]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;

    const handleOverlayClick = (e) => {
        if (setShowCreateModal) {
            e.stopPropagation();
            setShowCreateModal(false);
        }
    };

    return (
        <>
            {showCreateModal && (
                <>
                    <div
                        className={styles['overlay']}
                        onClick={handleOverlayClick}
                    />
                    <CreateModal
                        setShowCreateModal={setShowCreateModal}
                        setContent={setContent}
                    />
                </>
            )}
            <div
                ref={drop}
                className={styles['drop-area']}
                data-testid="dustbin"
            >
                {isActive ? (
                    <div className={styles['container']}>
                        <div className={styles['drop-overlay']} />
                        <RenderContent
                            content={content}
                            setContent={setContent}
                        />
                    </div>
                ) : content.length !== 0 ? (
                    <RenderContent
                        content={content}
                        setContent={setContent}
                        setShowCreateModal={setShowCreateModal}
                    />
                ) : (
                    <button
                        className={styles['create-button']}
                        style={{ margin: '5px' }}
                        onClick={() => setShowCreateModal(true)}
                    >
                        +
                    </button>
                )}
            </div>
        </>
    );
};

const RenderContent = ({ content, setContent, setShowCreateModal }) => {
    const removeItem = (id) => {
        const newItems = content.filter((obj) => {
            return obj.id !== id;
        });
        localStorage.setItem('cards', JSON.stringify(newItems));
        setContent((prev) =>
            prev.filter((obj) => {
                return obj.id !== id;
            })
        );
    };

    return (
        <div className={styles['ribbon-container']}>
            {content.map((item) => {
                return (
                    <div
                        onClick={() => removeItem(item.id)}
                        className={styles['ribbon-character']}
                        key={item.id}
                    >
                        <img
                            src={item.image}
                            className={styles['ribbon-image']}
                            alt="character image"
                        />
                        <div className={styles['ribbon-name']}>{item.name}</div>
                    </div>
                );
            })}
            <button
                disabled={content.length === 8}
                className={styles['create-button']}
                onClick={() => setShowCreateModal(true)}
            >
                +
            </button>
        </div>
    );
};

export default Ribbon;
