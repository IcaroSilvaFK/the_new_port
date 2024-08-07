import { useCallback } from "react"
import { useState } from "react"

type UseBooleanReturnProps = [
  boolean, () => void, () => void, () => void
]


/**
 * @param [defaultTo=false]
 * 
 * @returns [currentValue, changeToTrue, changeToFalse, toggle] 
*/
export function useBoolean(defaultTo = false): UseBooleanReturnProps {
  const [state, setState] = useState(defaultTo)


  const onChangeTrue = useCallback(() => setState(true), [])
  const onChangeFalse = useCallback(() => setState(false), [])
  const handleToggle = useCallback(() => setState(prev => !prev), [])

  return [
    state,
    onChangeTrue,
    onChangeFalse,
    handleToggle
  ]
}
