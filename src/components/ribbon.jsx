import { useDrop } from 'react-dnd';

import styles from './ribbon.module.css';

const Ribbon = ({ content, setContent }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;

    return (
        <div ref={drop} className={styles['drop-area']} data-testid="dustbin">
            {isActive ? (
                'Release to drop'
            ) : content.length !== 0 ? (
                <RenderContent content={content} setContent={setContent} />
            ) : (
                'Drop a card'
            )}
        </div>
    );
};

const RenderContent = ({ content, setContent }) => {
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
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Ribbon;
