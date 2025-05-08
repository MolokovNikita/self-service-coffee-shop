import styles from './DrinkSelection.module.scss'

interface Props {
  name: string
  image: string
  price: number
  badge?: string
  onClick: () => void
}

export default function DrinkCard({ name, image, price, badge, onClick }: Props) {
  return (
    <div className={styles.drinkCard} onClick={onClick}>
      {badge && (
        <div className={styles.doubleBadge}>
          <span>{badge}</span>
        </div>
      )}
      <img src={image} alt={name} width={150} height={150} className={styles.drinkImage} />
      <h3 className={styles.drinkName}>{name}</h3>
      <p className={styles.drinkPrice}>
        <span className={styles.priceFrom}>от</span>{' '}
        <span className={styles.currency}>{price}₽</span>
      </p>
    </div>
  )
}
