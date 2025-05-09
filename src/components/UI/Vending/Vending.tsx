import React, { useEffect, useState, useRef } from 'react'
import type { Drink } from '../../../types/types'
import emulator from '../../../emulator'
import styles from './vending.module.scss'
import CircularTimer from './CircularTimer'
import InitializingLoader from './InitializingLoader'
interface Props {
    drink: Drink
    onFinish: () => void
}

const Vending: React.FC<Props> = ({ drink, onFinish }) => {
    const [phase, setPhase] = useState<'idle' | 'preparing' | 'done' | 'error'>('idle')
    const timeoutRef = useRef<number | undefined>(undefined)

    // Константы для длительности анимаций
    const PREPARATION_DURATION = 10000 // 10 секунд на приготовление напитка
    const SUCCESS_DISPLAY_DURATION = 3000 // 3 секунды на отображение успешного результата

    useEffect(() => {
        handleStart()
        return () => {
            timeoutRef.current && clearTimeout(timeoutRef.current)
        }
    }, [])


    const handleVendResult = (result: boolean) => {
        // Устанавливаем состояние фазы
        setPhase(result ? 'done' : 'error')
        // Таймер на завершение
        timeoutRef.current = setTimeout(() => {
            onFinish()
        }, SUCCESS_DISPLAY_DURATION)
    }

    const handleStart = () => {
        setPhase('idle')
        emulator.Vend(parseInt(drink.id), (result: boolean) => {
            console.log('result', result)
            if (result) {
                setPhase('preparing')
            }
            else {
                setPhase('error')
            }
        })
    }
    const handleRetry = () => {
        handleStart()
    }

    return (
        <div className={`${styles.container} ${phase === 'done' ? styles.successState : ''}`}>
            {/* {(phase !== 'error' && phase !== 'done') && <h2 className={styles.title}>{drink.name}</h2>} */}
            <div className={styles.statusContainer}>
                {phase === 'idle' && (
                    <>
                        <InitializingLoader />
                        <div className={styles.hint}>
                            Нажмите Ctrl+Enter для успешного завершения<br />
                            Нажмите Ctrl+Backspace для ошибки
                        </div>
                    </>

                )}

                {phase === 'preparing' && (
                    <div className={styles.initialState}>
                        <CircularTimer
                            duration={PREPARATION_DURATION / 1000}
                            onComplete={() => handleVendResult(true)}
                            label="Приготовление напитка"
                        />
                    </div>
                )}

                {phase === 'done' && (
                    <div className={styles.successState} onClick={onFinish}>
                        <img src='/drink.svg' alt={drink.name} className={styles.drinkImage} />
                        <div className={styles.successMessage}>
                            Напиток готов!<br />
                            <span className={styles.successMessageSubtitle}>вы можете забрать его</span>
                        </div>

                    </div>
                )}

                {phase === 'error' && (
                    <div className={styles.errorState}>
                        <div className={styles.errorIcon}>⚠</div>
                        <div className={styles.errorMessage}>
                            Ошибка приготовления
                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.retryButton}
                                    onClick={handleRetry}
                                >
                                    Повторить
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={onFinish}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Vending
