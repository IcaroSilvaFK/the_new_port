//@ts-ignore
import MovingComponent from 'react-moving-text'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  type?: string
  duration?: string
  delay?: string
  direction?: string
  iteration?: string
  fillMode?: string
}

export function AnimatedText(props: Props) {
  const { children, ...rest } = props

  return (
    <MovingComponent
      type="slideInFromLeft"
      duration="1000ms"
      delay="0s"
      direction="normal"
      timing="ease"
      iteration="1"
      fillMode="none"
      {...rest}
    >
      {children}
    </MovingComponent>
  )
}
