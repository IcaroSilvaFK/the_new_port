import { Slot } from '@radix-ui/react-slot'

import styles from './styles.module.scss'

type Props = {
  as?: string
  image: string
}

export function CardTec(props: Props) {
  const { as, image } = props
  const Component = as ? Slot : 'li'

  return (
    <Component className={styles.container}>
      <img src={image} />
    </Component>
  )
}
