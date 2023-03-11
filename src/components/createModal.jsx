import { useState } from 'react';

import styles from './createModal.module.css';

const generateRandom = () => {
    let random = Math.random() * 3000;
    random = Math.floor(random) + 826;
    return random.toString();
};

const CreateModal = ({ setShowCreateModal, setContent }) => {
    const [character, setCharacter] = useState({
        id: generateRandom(),
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: '',
        location: '',
        image: '',
        userCreated: true,
    });
    const [errors, setErrors] = useState({
        name: false,
        image: false,
    });

    const checkFirstLetterCapital = (string) => {
        return string[0] === string[0].toUpperCase();
    };

    const checkValidUrl = (str) => {
        var regex =
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    };

    const handleChange = (e, type) => {
        const newValue = e.target.value;
        setCharacter((prev) => ({ ...prev, [type]: e.target.value }));
        if (type === 'name') {
            if (
                newValue.length < 3 ||
                newValue.length > 80 ||
                !checkFirstLetterCapital(newValue)
            )
                setErrors((prev) => ({ ...prev, name: true }));
            else setErrors((prev) => ({ ...prev, name: false }));
        }
        if (type === 'image') {
            if (!checkValidUrl(newValue))
                setErrors((prev) => ({ ...prev, image: true }));
            else setErrors((prev) => ({ ...prev, image: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.name || errors.image) return;
        setShowCreateModal(false);
    };

    const addCharacter = () => {
        if (errors.name || errors.image) return;
        let date = new Date().toJSON();
        const items = JSON.parse(localStorage.getItem('cards')) || [];
        const completeCharacter = { ...character, dateTime: date };
        localStorage.setItem(
            'cards',
            JSON.stringify([...items, completeCharacter])
        );
        setContent((prev) => [...prev, completeCharacter]);
    };

    return (
        <div className={styles['modal']}>
            <h3>Create Character</h3>
            <div className={styles['gap-20']} />
            <form className={styles['form']} onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        onChange={(e) => handleChange(e, 'name')}
                        value={character.name}
                        className={`${styles['input']} ${
                            errors.name && styles['error']
                        }`}
                        type="text"
                        name="name"
                    />
                </label>
                <label>
                    Status
                    <select
                        className={styles['input']}
                        onChange={(e) => handleChange(e, 'status')}
                    >
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">unknown</option>
                    </select>
                </label>
                <label>
                    Species
                    <input
                        onChange={(e) => handleChange(e, 'species')}
                        value={character.species}
                        className={styles['input']}
                        type="text"
                        name="species"
                    />
                </label>
                <label>
                    Type
                    <input
                        onChange={(e) => handleChange(e, 'type')}
                        value={character.type}
                        className={styles['input']}
                        type="text"
                        name="type"
                    />
                </label>
                <label>
                    Gender
                    <input
                        onChange={(e) => handleChange(e, 'gender')}
                        value={character.gender}
                        className={styles['input']}
                        type="text"
                        name="gender"
                    />
                </label>
                <label>
                    Origin
                    <input
                        onChange={(e) => handleChange(e, 'origin')}
                        value={character.origin}
                        className={styles['input']}
                        type="text"
                        name="origin"
                    />
                </label>
                <label>
                    Location
                    <input
                        onChange={(e) => handleChange(e, 'location')}
                        value={character.location}
                        className={styles['input']}
                        type="text"
                        name="location"
                    />
                </label>
                <label>
                    Image
                    <input
                        onChange={(e) => handleChange(e, 'image')}
                        value={character.image}
                        className={`${styles['input']} ${
                            errors.image && styles['error']
                        }`}
                        type="text"
                        name="image"
                    />
                </label>
                <button onClick={addCharacter}>Create Character</button>
            </form>
        </div>
    );
};

export default CreateModal;
