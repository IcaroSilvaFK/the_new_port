import { Backdrop } from './components/Backdrop'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Ai } from './sections/Ai'
import { Approach } from './sections/Approach'
import { CallToAction } from './sections/CallToAction'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Stack } from './sections/Stack'
import { Work } from './sections/Work'

export function App() {
  return (
    <>
      <Backdrop />
      <Header />
      <main>
        <Hero />
        <Stack />
        <Services />
        <Ai />
        <Work />
        <CallToAction />
        <About />
        <Approach />
        <Certifications />
        <Faq />
        <Contact />
      </main>
      <FloatingWhatsApp />
    </>
  )
}
