import styles from './modal.module.css';

const Modal = ({
    name,
    status,
    location,
    species,
    origin,
    gender,
    episodeList,
    image,
}) => {
    return (
        <div className={styles['modal']}>
            <img src={image} className={styles['floating-image']} />
            <div className={styles['character-name']}>{name}</div>
            <span>
                <span className={styles['grey-text']}> Status: </span>
                {status}
            </span>
            <span>
                <span className={styles['grey-text']}>Species</span>: {species}
            </span>
            <span>
                <span className={styles['grey-text']}>Location: </span>
                {location.name}
            </span>
            <span>
                <span className={styles['grey-text']}>Origin: </span>
                {origin.name}
            </span>
            <span>
                <span className={styles['grey-text']}>Gender: </span>

                {gender}
            </span>
            <span>
                <span className={styles['grey-text']}>
                    Number of appearances:{' '}
                </span>
                {episodeList.length}
            </span>
        </div>
    );
};

export default Modal;
