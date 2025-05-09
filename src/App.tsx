import React, { useState } from 'react'
import DrinkSelection from './components/UI/DrinkSelection/DrinkSelection'
import PaymentMethod from './components/UI/PaymentMethod/PaymentMethod'
import CashPayment from './components/UI/CashPayment/CashPayment'
import CardPayment from './components/UI/CardPayment/CardPayment'
import Vending from './components/UI/Vending/Vending'
import type { Drink, PaymentMethodType } from './types/types'
import StartScreen from './components/UI/StartScreen/StartScreen'
import './App.css'


const App: React.FC = () => {
  const [step, setStep] = useState<'select' | 'payment' | 'cash' | 'card' | 'vending'>('select')
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null)
  const [_, setPaymentMethod] = useState<PaymentMethodType>(null)
  const [isStartScreen, setIsStartScreen] = useState(true)

  return (
    <div className="app">
      {isStartScreen ? (
        <StartScreen setIsStartScreen={setIsStartScreen} />
      ) : (
        <>
          {step === 'select' && (
            <DrinkSelection
              onSelect={(drink: Drink) => {
                setSelectedDrink(drink)
                setStep('payment')
              }}
            />
          )}

          {step === 'payment' && selectedDrink && (
            <PaymentMethod
              totalAmount={selectedDrink.price}
              onSelect={(method: PaymentMethodType) => {
                setPaymentMethod(method)
                setStep(method === 'cash' ? 'cash' : 'card')
              }}
              onBack={() => setStep('select')}
            />
          )}

          {step === 'cash' && selectedDrink && (
            <CashPayment
              drink={selectedDrink}
              onSuccess={() => setStep('vending')}
              onCancel={() => setStep('select')}
            />
          )}

          {step === 'card' && selectedDrink && (
            <CardPayment
              drink={selectedDrink}
              onSuccess={() => setStep('vending')}
              onCancel={() => setStep('select')}
            />
          )}

          {step === 'vending' && selectedDrink && (
            <Vending
              drink={selectedDrink}
              onFinish={() =>
                setStep('select')
              }
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
