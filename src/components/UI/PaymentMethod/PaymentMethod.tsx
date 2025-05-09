import React, { useState } from 'react'
import type { PaymentMethodType } from '../../../types/types'
import styles from './paymentMethod.module.scss'
import { ArrowLeft } from 'lucide-react'

interface Props {
    onSelect: (method: PaymentMethodType) => void
    totalAmount: number
    onBack: () => void
}

const PaymentMethod: React.FC<Props> = ({ onSelect, totalAmount, onBack }) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null)

    const handleMethodSelect = (method: PaymentMethodType) => {
        setSelectedMethod(method)
    }

    const handlePay = () => {
        if (selectedMethod) {
            onSelect(selectedMethod)
        }
    }

    const formatAmount = (amount: number) => {
        return amount.toLocaleString('ru-RU')
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={onBack}>
                <ArrowLeft className={styles.icon} />
            </button>
            <img src='/moneyGroup.svg' alt="Money" className={styles.icon} />
            <div className={styles.title}>Выберите способ оплаты</div>
            <div className={styles.buttonsContainer}>
                <button
                    className={`${styles.paymentButton} ${selectedMethod === 'card' ? styles.selected : ''}`}
                    onClick={() => handleMethodSelect('card')}
                >
                    Банковской картой
                </button>
                <button
                    className={`${styles.paymentButton} ${selectedMethod === 'cash' ? styles.selected : ''}`}
                    onClick={() => handleMethodSelect('cash')}
                >
                    Наличными
                </button>
            </div>
            <button
                className={styles.payButton}
                onClick={handlePay}
                disabled={!selectedMethod}
            >
                <span className={styles.payText}>Оплатить</span>
                <span className={styles.payAmount}>{formatAmount(totalAmount)}₽</span>
            </button>
        </div>
    )
}

export default PaymentMethod
