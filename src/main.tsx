import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { App } from './App.tsx'
import { ModalChangeLanguage } from './components/ModalChangeLanguage/index.tsx'
import { Translator } from './components/Translator/index.tsx'
import { TranslatorContextProvider } from './contexts/TranslatorContext.tsx'
import './languages/i18n.ts'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <TranslatorContextProvider>
      <Translator />
      <ModalChangeLanguage />
    </TranslatorContextProvider>
    <Toaster />
    <Analytics framework="react" />
    <SpeedInsights framework="react" />
  </React.StrictMode>
)
