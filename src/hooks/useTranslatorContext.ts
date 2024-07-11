import { useContext } from "react";

import { TranslatorContext } from '../contexts/TranslatorContext'

export function useTranslatorContext() {
  return useContext(TranslatorContext)
}
