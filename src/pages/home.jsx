import Container from '../components/container';

import styles from './home.module.css';

const Home = () => {
    return (
        <div>
            <h2 className={styles['header']}>Rick & Morty Deck Builder</h2>
            <Container />
        </div>
    );
};

export default Home;
