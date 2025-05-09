import React, { useEffect, useState } from 'react'
import type { Drink } from '../../../types/types'
import emulator from '../../../emulator'
import styles from './cashPayment.module.scss'

interface Props {
    drink: Drink
    onSuccess: () => void
    onCancel: () => void
}

const CashPayment: React.FC<Props> = ({ drink, onSuccess, onCancel }) => {
    const [insertedAmount, setInsertedAmount] = useState<number>(0)

    useEffect(() => {
        const handleCash = (amount: number) => {
            setInsertedAmount(prev => prev + amount)
        }

        emulator.StartCashin(handleCash)

        return () => {
            emulator.StopCashin()
        }
    }, [])

    useEffect(() => {
        if (insertedAmount >= drink.price) {
            onSuccess()
        }
    }, [insertedAmount, drink.price, onSuccess])

    return (
        <div className={styles.cashPayment}>
            <h2 className={styles.title}>Оплата наличными</h2>
            <div className={styles.amountInfo}>
                <p>Сумма к оплате: {drink.price} ₽</p>
                <p>Внесено: {insertedAmount} ₽</p>
            </div>
            <div className={styles.hint}>
                Используйте клавиши ctr + 1, 2, 5, 0 для внесения денег
            </div>
            <button onClick={onCancel} className={styles.cancelButton}>
                Отмена
            </button>
        </div>
    )
}

export default CashPayment
