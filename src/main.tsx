import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import './languages/i18n.ts'
import './styles/global.scss'
import { Translator } from './components/Translator/index.tsx'
import { TranslatorContextProvider } from './contexts/TranslatorContext.tsx'
import { ModalChangeLanguage } from './components/ModalChangeLanguage/index.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <App />
    <TranslatorContextProvider>
      <Translator />
      <ModalChangeLanguage />
    </TranslatorContextProvider>
  </React.StrictMode>
)
