import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './languages/i18n.ts'
import './styles/global.scss'
import { Translator } from './components/Translator/index.tsx'
import { TranslatorContextProvider } from './contexts/TranslatorContext.tsx'
import { App } from './App.tsx'
import { ModalChangeLanguage } from './components/ModalChangeLanguage/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <TranslatorContextProvider>
      <Translator />
      <ModalChangeLanguage />
    </TranslatorContextProvider>
    <Toaster />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
)
