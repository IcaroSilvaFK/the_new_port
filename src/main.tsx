import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MotionConfig } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { App } from './App.tsx'
import { ModalChangeLanguage } from './components/ModalChangeLanguage/index.tsx'
import { TranslatorContextProvider } from './contexts/TranslatorContext.tsx'
import './languages/i18n.ts'
import { SmoothScroll } from './providers/SmoothScroll.tsx'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <TranslatorContextProvider>
          <App />
          <ModalChangeLanguage />
        </TranslatorContextProvider>
      </SmoothScroll>
    </MotionConfig>
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          borderRadius: '999px',
          background: 'var(--ink)',
          color: 'var(--paper)',
          fontFamily: 'Geist, system-ui, sans-serif',
          fontSize: '0.92rem',
        },
      }}
    />
    <Analytics framework="react" />
    <SpeedInsights framework="react" />
  </React.StrictMode>
)
