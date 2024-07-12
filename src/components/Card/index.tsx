import { Slot } from '@radix-ui/react-slot'
import { Tilt } from 'react-tilt'

import styles from './styles.module.scss'

type Props = {
  as?: string
  title: string
  description: string
  image: string
}

export function Card(props: Props) {
  const { as, title, description, image } = props

  const Comp = as ? Slot : 'li'

  return (
    <Comp className={styles.container}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div>
        <Tilt>
          <img src={image} alt={title} />
        </Tilt>
      </div>
    </Comp>
  )
}
