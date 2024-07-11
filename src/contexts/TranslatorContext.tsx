import { ReactNode } from "react";
import { createContext } from "react";

import { useBoolean } from '../hooks/useBoolean'

type TranslatorContextProps = {
  isOpenModalChangeLanguage: boolean
  handleOpenModalChangeLanguage(): void
  handleCloseModalChangeLanguage(): void
}

export const TranslatorContext = createContext<TranslatorContextProps>({} as TranslatorContextProps)

type Props ={
  children: ReactNode
}


export function TranslatorContextProvider(props: Props) {
  const { children } = props
  const [isOpenModalChangeLanguage, handleOpenModalChangeLanguage, handleCloseModalChangeLanguage] = useBoolean()
   
  return (
    <TranslatorContext.Provider value={{isOpenModalChangeLanguage, handleCloseModalChangeLanguage, handleOpenModalChangeLanguage}} >
      {children}
    </TranslatorContext.Provider>
  )
}
