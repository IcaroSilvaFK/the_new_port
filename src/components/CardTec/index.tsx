import { Slot } from '@radix-ui/react-slot'

import styles from './styles.module.scss'

type Props = {
  as?: string
  image: string
  alt?: string
}

export function CardTec(props: Props) {
  const { as, image, alt } = props
  const Component = as ? Slot : 'li'

  return (
    <Component className={styles.container}>
      <img src={image} alt={alt} />
    </Component>
  )
}
