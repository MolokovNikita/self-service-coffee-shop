import styles from './drinkSelection.module.scss'
import { useState } from 'react'
import { Phone } from 'lucide-react'
import { categories, drinks } from './data.ts'
import CategoryCard from './CategoryCard'
import DrinkCard from './DrinkCard'
import type { Drink } from '../../../types/types'

interface Props {
  onSelect: (drink: Drink) => void
}

export default function DrinkSelection({ onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState('coffee')

  return (
    <div className={styles.container} data-active={activeCategory}>
      <div className={styles.wrapper} data-active={activeCategory}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Выбор напитка</h1>
          <button className={styles.loginButton}>
            <div className={styles.phoneIcon}><Phone /></div>
            <span>Вход / регистрация</span>
          </button>
          <img
            src={`/Vector-${activeCategory}.svg`}
            alt="vector"
            className={styles.vector}
          />
        </header>

        {/* Категории */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              image={cat.image}
              isActive={cat.id === activeCategory}
              onClick={setActiveCategory}
            />
          ))}
        </div>

        {/* Заголовок секции */}
        <div className={styles.sectionTitleContainer}>
          <div className={styles.sectionTitle}>
            <div className={styles.sectionTitleDecoration}></div>
            <h2 className={styles.sectionTitleText}>
              {categories.find((c) => c.id === activeCategory)?.name}
            </h2>
          </div>

          {/* Напитки */}
          <div className={styles.drinksGrid}>
            {drinks.map((drink) => (
              <DrinkCard
                key={drink.id}
                name={drink.name}
                image={drink.image}
                price={drink.price}
                badge={drink.badge}
                onClick={() => onSelect(drink)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
