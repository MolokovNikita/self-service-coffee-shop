import React, { useEffect, useState } from 'react'
import type { Drink } from '../../../types/types'
import emulator from '../../../emulator'
import styles from './cardPayment.module.scss'

interface Props {
    drink: Drink
    onSuccess: () => void
    onCancel: () => void
}

const CardPayment: React.FC<Props> = ({ drink, onSuccess, onCancel }) => {
    const [statusMessage, setStatusMessage] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const displayHandler = (msg: string) => {
            setStatusMessage(msg)
            setIsProcessing(msg !== 'Оплата успешна' && msg !== 'Ошибка оплаты')
        }

        const paymentHandler = (result: boolean) => {
            if (result) {
                setStatusMessage('Оплата успешна')
                setTimeout(onSuccess, 1500)
            } else {
                setStatusMessage('Ошибка оплаты. Попробуйте снова')
                setTimeout(onCancel, 2000)
            }
            setIsProcessing(false)
        }

        emulator.BankCardPurchase(
            drink.price,
            paymentHandler,
            displayHandler
        )

        return () => {
            emulator.BankCardCancel()
        }
    }, [drink.price, onSuccess, onCancel])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Оплата картой</h2>
            <div className={styles.paymentStatus}>
                <div className={`${styles.statusMessage} ${isProcessing ? styles.processing : ''}`}>
                    {statusMessage}
                </div>
                {isProcessing && (
                    <div className={styles.processingIndicator}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
                <div className={styles.hint}>
                    Используйте Ctrl+Enter для успеха<br />
                    Ctrl+Escape для отмены
                </div>
            </div>
            <button
                className={styles.cancelButton}
                onClick={onCancel}
            >
                Отмена
            </button>
        </div>
    )
}

export default CardPayment
