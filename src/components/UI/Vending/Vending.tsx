import React, { useEffect, useState } from 'react'
import type { Drink } from '../../../types/types'
import emulator from '../../../emulator'
import styles from './vending.module.scss'
import CircularTimer from './CircularTimer'

interface Props {
    drink: Drink
    onFinish: () => void
}

const Vending: React.FC<Props> = ({ drink, onFinish }) => {
    const [phase, setPhase] = useState<'timer' | 'done' | 'error'>('timer')

    useEffect(() => {
        if (phase === 'done' || phase === 'error') {
            const timeout = setTimeout(onFinish, 2000)
            return () => clearTimeout(timeout)
        }
    }, [phase, onFinish])

    // Таймер приготовления
    const handleTimerComplete = () => {
        emulator.Vend(drink.id, (result: boolean) => {
            if (result) {
                setPhase('done')
            } else {
                setPhase('error')
            }
        })
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{drink.name}</h2>
            <div className={styles.preparationStatus}>
                {phase === 'timer' && (
                    <CircularTimer duration={10} onComplete={() => setPhase('done')} label="Приготовление напитка" />
                )}
                {phase === 'done' && (
                    <div className={styles.statusMessage}>Ваш напиток готов!</div>
                )}
                {phase === 'error' && (
                    <div className={styles.statusMessage}>Ошибка приготовления</div>
                )}
            </div>
        </div>
    )
}

export default Vending
