import styles from './drinkSelection.module.scss'

interface Props {
  id: string
  title: string
  image: string
  isActive: boolean
  onClick: (id: string) => void
}

export default function CategoryCard({ id, title, image, isActive, onClick }: Props) {
  return (
    <div
      className={`${styles.categoryCard} ${!isActive ? styles.inactive : ''}`}
      onClick={() => onClick(id)}
    >
      <img src={image} alt={title} className={styles.categoryImage} />
      <div className={styles.categoryTitle}>
        <div>{title}</div>
      </div>
    </div>
  )
}
