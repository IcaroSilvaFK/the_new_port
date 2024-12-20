import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo, useState } from 'react'

import { motion } from 'framer-motion'
import Marquee from 'react-fast-marquee'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BounceLoader } from 'react-spinners'
import { Tilt } from 'react-tilt'
import { z } from 'zod'

import MeImage from './assets/Icaro Black Background.png'
import { Card } from './components/Card'
import { CardTec } from './components/CardTec'
import { Header } from './components/Header'
import { baseApi } from './configs/api'
import { data } from './data/projects'
import { AnimatedText } from './externals/Text'
import { success } from './externals/toast/toast'

import styles from './styles.module.scss'

const resources = [
  'https://media.graphassets.com/1IklfdbR9CVkBlw4Lqnr',
  'https://media.graphassets.com/4cOeDZ8QUO5CStpkim26',
  'https://media.graphassets.com/4rStTW9QFGhVIQ3q0hxA',
  'https://media.graphassets.com/cgscjaI9R0iTAdcC0Oge',
  'https://media.graphassets.com/vWIFReYnTDi0GHiKfYJ6',
  'https://media.graphassets.com/MewWroVZSDKc3WMOMr98',
  'https://avatars.githubusercontent.com/u/13810373?s=48&v=4',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/520px-Go_Logo_Blue.svg.png',
  'https://raw.githubusercontent.com/gin-gonic/logo/master/color.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/996px-Svelte_Logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/500px-Angular_full_color_logo.svg.png',
  'https://echo.labstack.com/img/logo-light.svg',
]

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string().min(5),
})

type FormType = z.infer<typeof formSchema>

export function App() {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const currentCards = useMemo(() => data[language as keyof typeof data], [language])
  const { register, reset, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const splitedText = t('title')
    .split('<br>')
    .map((text) =>
      text
        .split('')
        .map((letter, idx) => (letter.trim() === '' && idx > 0 ? '&nbsp;' : letter.trim()))
        .filter(Boolean)
    )

  const onSubmit = useCallback(
    async (data: FormType) => {
      try {
        setIsLoading(true)
        await baseApi.post('/contacts', data)
        reset()
        success(t('emailSentedSuccess'))
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [reset]
  )

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.first__section}>
        <div>
          <AnimatedText>
            {splitedText.map((row, line) => (
              <div className={styles.first__section__title}>
                {row.map((letter, index) => (
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: ((line + 1) * index) / 10,
                    }}
                    key={index}
                    dangerouslySetInnerHTML={{ __html: letter }}
                  />
                ))}
              </div>
            ))}
          </AnimatedText>
          <p>{t('description')}</p>
          <div className={styles.first__section__button}>
            <a href="#services">{t('ourServices')}</a>
            <a href="#contact">{t('contactUs')}</a>
          </div>
        </div>
        <Tilt>
          <img
            src={MeImage}
            alt="Icaro Vieira"
            className={`${styles.image__section} ${styles.sature}`}
          />
        </Tilt>
      </section>
      <section className={styles.section__tecnologies}>
        <Marquee>
          {resources.map((res) => (
            <CardTec key={res} image={res} alt={res} />
          ))}
        </Marquee>

        <Marquee direction="right">
          {resources.map((res) => (
            <CardTec key={res} image={res} alt={res} />
          ))}
        </Marquee>
      </section>
      <section id="services" className={styles.second__section}>
        <div>
          <header>
            <span className={styles.section__flag}>{t('ourServices')}</span>

            <AnimatedText>
              <h2 className={styles.section__title}>{t('expertiseInFullStackTitle')}</h2>
            </AnimatedText>
          </header>
          <p className={styles.section__description}>{t('expertiseTextDescription')}</p>
          <div>
            <ul>
              <li>
                <h3>React</h3>
                <span>{t('reactDescription')}</span>
              </li>
              <li>
                <h3>React Native</h3>
                <span>{t('reactNativeDescription')}</span>
              </li>
              <li>
                <h3>NextJS</h3>
                <span>{t('nextJsDescription')}</span>
              </li>
              <li>
                <h3>NestJS</h3>

                <span>{t('nestJsDescription')}</span>
              </li>
              <li>
                <h3>Gin</h3>
                <span>{t('ginGoLangDescription')}</span>
              </li>
            </ul>
            <Tilt>
              <img
                src="https://images.unsplash.com/photo-1643409329501-f17776d3823a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Icaro Vieira"
                className={styles.image__section}
              />
            </Tilt>
          </div>
        </div>
      </section>

      <section className={styles.three__section} id="portfolio">
        <div>
          <header>
            <span className={styles.section__flag}>{t('ourWork')}</span>
            <AnimatedText>
              <h2 className={styles.section__title}>{t('showcasingMyExpertise')}</h2>
            </AnimatedText>
          </header>

          <p className={styles.section__description}>{t('webProjects')}</p>

          <ul>
            {currentCards.map((project) => (
              <Card
                key={project.name}
                title={project.name}
                description={project.description}
                image={project.image}
              />
            ))}
          </ul>
        </div>
      </section>
      <section id="contact" className={styles.section__form}>
        <header>
          <span className={styles.section__flag}>{t('getInTouch')}</span>
          <h2 className={styles.section__title}>{t('letsDiscussYourProject')}</h2>
        </header>
        <p className={styles.section__description}>{t('fillInTheForm')}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">{t('name')}</label>
            <input type="text" id="name" placeholder={t('typeYourName')} {...register('name')} />
          </div>
          <div>
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              placeholder={t('typeYourEmail')}
              {...register('email')}
            />
          </div>
          <div>
            <label htmlFor="messsage">{t('message')}</label>
            <textarea
              id="messsage"
              placeholder={t('typeYourMessage')}
              {...register('message')}
            ></textarea>
          </div>
          <button disabled={isLoading}>
            {isLoading ? <BounceLoader size={20} /> : t('submit')}
          </button>
        </form>
      </section>

      <footer>
        <span>&copy; Icaro Vieira. {t('copy')}</span>
      </footer>
    </div>
  )
}
