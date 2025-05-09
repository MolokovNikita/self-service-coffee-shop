import type { Emulator } from './types/types'
const MAX_PRODUCTS = 6;
const emulator: Emulator & {
    _handlers: {
        cash: (() => void) | null;
        card: (() => void) | null;
        vend: (() => void) | null;
    };
} = {
    _handlers: {
        cash: null,
        card: null,
        vend: null
    },

    StartCashin(callback) {
        if (this._handlers.cash) {
            console.warn('Cashin already started!');
            return;
        }
        const keyMap: { [key: string]: number } = {
            '1': 10,
            '2': 50,
            '5': 100,
            '0': 500
        };

        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key in keyMap) {
                callback(keyMap[e.key]);
            }
        };

        window.addEventListener('keydown', handler);
        this._handlers.cash = () => {
            window.removeEventListener('keydown', handler);
        };
    },

    StopCashin() {
        this._handlers.cash?.();
        this._handlers.cash = null;
    },

    BankCardPurchase(amount, callback, display_cb) {
        let cancelled = false;

        const messages = [
            'Приложите карту',
            'Обработка карты',
            'Связь с банком',
            'Подтвердите оплату'
        ];

        const process = async () => {
            for (const msg of messages) {
                if (cancelled) {
                    display_cb('Операция отменена');
                    return callback(false);
                }
                display_cb(msg);
                await delay(2000);
            }
            const handler = (e: KeyboardEvent) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    display_cb(`Оплачено ${amount}₽`);
                    callback(true);
                    cleanup();
                }
                if (e.ctrlKey && e.key === 'Escape') {
                    display_cb('Отмена оплаты');
                    callback(false);
                    cleanup();
                }
            };

            const cleanup = () => {
                window.removeEventListener('keydown', handler);
                this._handlers.card = null;
            };

            window.addEventListener('keydown', handler);
            this._handlers.card = cleanup;
        };

        process();
    },

    BankCardCancel() {
        if (this._handlers.card) {
            this._handlers.card();
            this._handlers.card = null;
        }
    },

    Vend(product_idx: number, callback: (success: boolean) => void) {
        console.log(`[Vend] Начата выдача продукта с индексом: ${product_idx}`);
        if (product_idx < 0 || product_idx > MAX_PRODUCTS) {
            callback(false);
            return;
        }
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                console.log(`[Vend] Успешная выдача продукта #${product_idx}`);
                callback(true);
                cleanup();
            }
            if (e.ctrlKey && e.key === 'Backspace') {
                console.log(`[Vend] Неуспешная выдача продукта #${product_idx}`);
                callback(false);
                cleanup();
            }
        };

        const timeout = setTimeout(() => {
            console.log(`[Vend] Авто-подтверждение: продукт #${product_idx} выдан по таймеру`);
            callback(true);
            cleanup();
        }, 7000);

        const cleanup = () => {
            window.removeEventListener('keydown', handler);
            clearTimeout(timeout);
            this._handlers.vend = null;
            console.log(`[Vend] Завершение процесса выдачи продукта #${product_idx}`);
        };

        window.addEventListener('keydown', handler);
        this._handlers.vend = cleanup;
    }

};

const delay = (ms: number) => new Promise(resolve =>
    setTimeout(() => resolve(true), ms)
).catch(e => console.error('Delay error:', e));

export default emulator;