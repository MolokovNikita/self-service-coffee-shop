import type { Emulator } from './types/types'

type EmulatorWithHandlers = Emulator & {
    _cashHandler: ((e: KeyboardEvent) => void) | null;
    _cardHandler: ((e: KeyboardEvent) => void) | null;
}

const emulator: EmulatorWithHandlers = {
    _cashHandler: null,
    _cardHandler: null,

    StartCashin(callback) {
        this._cashHandler = (e: KeyboardEvent) => {
            if (['1', '2', '5', '0'].includes(e.key)) {
                const amount = e.key === '0' ? 10 : parseInt(e.key, 10)
                callback(amount)
            }
        }
        window.addEventListener('keydown', this._cashHandler)
    },

    StopCashin() {
        if (this._cashHandler) {
            window.removeEventListener('keydown', this._cashHandler)
            this._cashHandler = null
        }
    },

    BankCardPurchase(_, callback, displayCallback) {
        displayCallback('Приложите карту')
        const messages = [
            'Обработка карты',
            'Связь с банком',
            'Подтвердите оплату'
        ]

        messages.forEach((msg, i) =>
            setTimeout(() => displayCallback(msg), (i + 1) * 1000)
        )

        this._cardHandler = (e: KeyboardEvent) => {
            if (e.key === 'y') {
                displayCallback('Оплата успешна')
                callback(true)
                window.removeEventListener('keydown', this._cardHandler!)
                this._cardHandler = null
            }
            if (e.key === 'n') {
                displayCallback('Ошибка оплаты')
                callback(false)
                window.removeEventListener('keydown', this._cardHandler!)
                this._cardHandler = null
            }
        }
        window.addEventListener('keydown', this._cardHandler)
    },

    BankCardCancel() {
        if (this._cardHandler) {
            window.removeEventListener('keydown', this._cardHandler)
            this._cardHandler = null
        }
    },

    Vend(_, callback) {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'v') {
                callback(true)
                window.removeEventListener('keydown', handler)
            }
            if (e.key === 'e') {
                callback(false)
                window.removeEventListener('keydown', handler)
            }
        }
        window.addEventListener('keydown', handler)
    }
}

export default emulator
