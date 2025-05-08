import React, { useEffect, useState } from 'react'
import type { Drink } from '../../../types/types'
import emulator from '../../../emulator'

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
        <div className="cash-payment">
            <h2>Оплата наличными</h2>
            <div className="amount-info">
                <p>Сумма к оплате: {drink.price} ₽</p>
                <p>Внесено: {insertedAmount} ₽</p>
            </div>
            <button onClick={onCancel} className="cancel-button">
                Отмена
            </button>
        </div>
    )
}

export default CashPayment
