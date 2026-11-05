import { Header } from './components/Header'
import { Approach } from './sections/Approach'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Stack } from './sections/Stack'
import { Work } from './sections/Work'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stack />
        <Services />
        <Work />
        <Approach />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
