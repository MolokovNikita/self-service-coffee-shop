import React from 'react'
import styles from './circularTimer.module.scss'

const RADIUS = 140
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const InitializingLoader: React.FC = () => {
    return (
        <div className={styles.timerWrapper}>
            <svg width={320} height={320} className={`${styles.svgCircle} ${styles.spinner}`}>
                <g transform="rotate(-90 160 160)">
                    <circle
                        className={styles.bg}
                        cx={160}
                        cy={160}
                        r={RADIUS}
                        stroke="#eee"
                        strokeWidth={4}
                        fill="none"
                    />
                    <circle
                        className={styles.fg}
                        cx={160}
                        cy={160}
                        r={RADIUS}
                        stroke="#FFD700"
                        strokeWidth={6}
                        fill="none"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * 0.75}
                        strokeLinecap="round"
                    />
                </g>
            </svg>

            <div className={styles.timeText}>...</div>
            <div className={styles.label}>Инициализация оборудования</div>
        </div>
    )
}

export default InitializingLoader
