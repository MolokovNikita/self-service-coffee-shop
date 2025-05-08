export interface Drink {
  id: string
  name: string
  price: number
  description: string
  image: string
}

export type Emulator = {
  StartCashin: (cb: (amount: number) => void) => void
  StopCashin: () => void
  BankCardPurchase: (
    amount: number,
    cb: (result: boolean) => void,
    display_cb: (message: string) => void
  ) => void
  BankCardCancel: () => void
  Vend: (product_idx: number, cb: (result: boolean) => void) => void
}

export type PaymentMethodType = 'cash' | 'card' | null
