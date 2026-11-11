import { Backdrop } from './components/Backdrop'
import { Header } from './components/Header'
import { Ai } from './sections/Ai'
import { Approach } from './sections/Approach'
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
        <Approach />
        <Certifications />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
