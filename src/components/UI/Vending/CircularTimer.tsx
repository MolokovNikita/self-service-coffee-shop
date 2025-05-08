import React, { useEffect, useRef, useState } from 'react';
import styles from './circularTimer.module.scss';

interface Props {
    duration: number; // seconds
    onComplete: () => void;
    label?: string;
}

const RADIUS = 140;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const pad = (n: number) => n.toString().padStart(2, '0');

const CircularTimer: React.FC<Props> = ({ duration, onComplete, label }) => {
    const [progress, setProgress] = useState(0); // 0..1
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        let stopped = false;
        function animate(now: number) {
            if (!startTimeRef.current) startTimeRef.current = now;
            const elapsed = (now - startTimeRef.current) / 1000;
            const prog = Math.min(elapsed / duration, 1);
            setProgress(prog);
            if (prog < 1 && !stopped) {
                rafRef.current = requestAnimationFrame(animate);
            } else if (prog >= 1) {
                setProgress(1);
                onComplete();
            }
        }
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            stopped = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [duration, onComplete]);

    const secondsLeft = Math.ceil(duration * (1 - progress));
    const dashOffset = CIRCUMFERENCE * (1 - progress);
    const angle = 2 * Math.PI * progress;
    const dotX = 160 + RADIUS * Math.sin(angle);
    const dotY = 160 - RADIUS * Math.cos(angle);

    return (
        <div className={styles.timerWrapper}>
            <svg width={320} height={320} className={styles.svgCircle}>
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
            </svg>
            <div className={styles.timeText}>
                {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
            </div>
            <div className={styles.label}>{label || 'Приготовление напитка'}</div>
        </div>
    );
};

export default CircularTimer; 