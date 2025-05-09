import React, { useEffect, useRef, useState } from 'react';
import styles from './circularTimer.module.scss';

interface Props {
    duration: number
    onComplete: () => void
    label?: string
    onProgressUpdate?: (progress: number) => void
}


const RADIUS = 140;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const pad = (n: number) => n.toString().padStart(2, '0');

const CircularTimer: React.FC<Props> = ({ duration, onComplete, label }) => {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef<number | null>(null);
    // const startTimeRef = useRef<number | null>(null);
    // const lastFrameTimeRef = useRef<number | null>(null);


    useEffect(() => {
        return () => {
            rafRef.current && cancelAnimationFrame(rafRef.current);
        }
    }, [])


    useEffect(() => {
        let stopped = false;
        const start = Date.now();

        const animate = () => {
            if (stopped) return;
            const elapsed = Date.now() - start;
            const prog = Math.min(elapsed / (duration * 1000), 1);

            setProgress(prog);

            if (prog < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                onComplete();
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            stopped = true;
            rafRef.current && cancelAnimationFrame(rafRef.current);
        };
    }, [duration, onComplete]);

    const secondsLeft = Math.max(0, Math.ceil(duration * (1 - progress)));
    const dashOffset = CIRCUMFERENCE * (1 - progress);
    const angle = 2 * Math.PI * progress;
    const dotX = 160 + RADIUS * Math.cos(angle);
    const dotY = 160 + RADIUS * Math.sin(angle);

    return (
        <div className={styles.timerWrapper}>
            <svg width={320} height={320} className={styles.svgCircle}>
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
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                    />
                    <circle
                        className={styles.dot}
                        cx={dotX}
                        cy={dotY}
                        r={10}
                        fill="#FFD700"
                    />
                </g>
            </svg>

            <div className={styles.timeText}>
                {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
            </div>
            <div className={styles.label}>{label || 'Приготовление напитка'}</div>
        </div>
    );
};

export default CircularTimer; 