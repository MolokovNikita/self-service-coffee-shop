import React from 'react';
import styles from './startScreen.module.scss';

interface Props {
    setIsStartScreen: (isStartScreen: boolean) => void;
}

const StartScreen: React.FC<Props> = ({ setIsStartScreen }) => {
    return (
        <div className={styles.startScreen} onClick={() => setIsStartScreen(false)}>
            {/* Верхние зёрна */}
            {['First', 'Second', 'Third', 'Fourth'].map((pos, index) => (
                <img
                    key={index}
                    src={`./seedTop${pos}.svg`}
                    alt="Зерно"
                    className={styles[`seedTop${pos}`]}
                />
            ))}

            <h1 className={styles.title}>
                ЭТО <br />ТВОЙ<br /> КОФЕ
            </h1>

            <img src="./Cup-1.svg" alt="Cup" className={styles.cup} />
            <img src="./Cup.svg" alt="Cup" className={styles.secondCup} />

            <div className={styles.touchMeContainer}>
                <img src="./TouchMeGroup.svg" alt="Коснитесь экрана" className={styles.touchMe} />
                <p className={styles.touchMeText}>
                    Коснитесь <br /> экрана
                </p>
            </div>

            {/* Нижние зёрна */}
            <img src="./seedBottomLeft.svg" alt="Зерно" className={styles.seedBottomLeft} />
            <img src="./seedBottomRight.svg" alt="Зерно" className={styles.seedBottomRight} />
        </div>
    );
};

export default StartScreen;
